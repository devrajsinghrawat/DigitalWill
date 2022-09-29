// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DigitalVault is Ownable, Pausable {
  uint private _expectedBlocksBetweenTwoSignatures;          // SignatureDuration
  // address public owner;
  mapping (address => uint) public userBalance;

  // should hold nominee and their %
    struct NomineeDetails {
        address nominee;
        uint share;
    } 
  // user and nominee link
  mapping(address => NomineeDetails[]) private userNomineeData;

  // Info Last Signed Block 
  mapping (address => uint) public lastSignedBlockNumber; 

  // Nominee 
  // To track nominee and user link, nominee => user => index
  mapping(address => mapping(address => uint)) public nomineeUserDetails;

  error NullAddress();
  error ZeroAmountError(uint txAmount);
  error InvalidShare(string message, uint share);
  error InsufficentBalanceError(uint userBalance, uint withdrawalAmount);

  event FundDeposited(address indexed depositor, uint amount, uint DepositBlockNumber);
  event FundWithdraw(address indexed withdrawer, uint amount, uint WithdrawalBlockNumber);
  event NomineeFundWithdraw(address indexed user, address indexed withdrawer, uint amount, uint WithdrawalBlockNumber);
  event NomineeAdded(address indexed nominee);
  event NomineeRemoved(address indexed user, address nominee);
  event Log(address sender, uint value);

  constructor(uint _signatureDuration) Ownable() {
    _expectedBlocksBetweenTwoSignatures = _signatureDuration;
  }

  /*
  * Add nominee for the user
  * @param  {address} _nominee address of nominee
  * @param  {uint} _share % share for the nominee
  */
  function addNominee(address _nominee, uint _share) public {
    if (_nominee == address(0))       // non Null Check
      revert NullAddress();
    if (_share > 100)               // %Share Check 
      revert InvalidShare("invalid share", _share);  

    // Get nominees 
    NomineeDetails[] memory nomineeData = getNominee();
    uint netShare = _share;
    for(uint i = 0; i < nomineeData.length; i++) {
      netShare += nomineeData[i].share;
    }

    if (netShare > 100)       // Net %Share check  
      revert InvalidShare("invalid share", _share);  

    NomineeDetails[] storage nominee = userNomineeData[_msgSender()];
    nominee.push(NomineeDetails(_nominee, _share));
    // Set Nominee and User link
    nomineeUserDetails[_nominee][_msgSender()] = (nominee.length -1); 
    emit NomineeAdded(_nominee);
    // OR
    // userNomineeData[_msgSender()].push(NomineeDetails(_nominee, _share));
  }

  /*
  * remove nominee for the user
  * @param  {address} _nominee address of nominee
  * @param  {address} _user address of user or can be zero address if function is directly called by user
  */
  function removeNominee(address _nominee, address _user) public { 
    // Customer should able to add nominee and their % share
    if (_nominee == address(0))       // non Null Check
      revert NullAddress();

    // Function should Update the OwnerNomineeData mapping
    /** This function can be called internally as wel externally and due to that
     we are making a check for address(0) */
    address user = (_user == address(0)) ?_msgSender() : _user;
    uint index = nomineeUserDetails[_nominee][user];

    NomineeDetails[] storage _nominees = userNomineeData[user];
    // delete nominee[index];
    // removeElement(nominee, index);
     require(index < _nominees.length, "index out of bound");
     for( uint i = index; i < (_nominees.length - 1); i++){
        _nominees[i] = _nominees[i + 1];
        nomineeUserDetails[_nominees[i].nominee][user] = i;
     }
     _nominees.pop();

    // remove Nominee and User link
    require(nomineeUserDetails[_nominee][user] >= 0, "invalid nominee address"); 
    delete nomineeUserDetails[_nominee][user];
 
    emit NomineeRemoved(user, _nominee);
  }

  /*
  * User should able to deposit funds into Vault
  */
  function deposit() external payable {
    if(msg.value <= 0)
      revert ZeroAmountError(msg.value);

   // Add user Sign    
    lastSignedBlockNumber[_msgSender()] = block.number;
  // Update user Balance 
    userBalance[_msgSender()] += msg.value;
    emit FundDeposited(_msgSender(), msg.value, block.number);
  }

  /*
  * User or Nominee can withdraw their allocated funds
  */
  function withdraw(uint amount) external whenNotPaused {
    // Using this function users and nominee should be able to withdraw their funds
    // Function should check if the user has sufficient balance or not
    if(userBalance[_msgSender()] < amount)
      revert InsufficentBalanceError(userBalance[_msgSender()], amount);

    userBalance[_msgSender()] -= amount;
    (bool sent, ) = (_msgSender()).call{value: amount}("");
    require(sent, "Failed to send Ether");
    // payable (_msgSender()).transfer(amount);
    emit FundWithdraw(_msgSender(), amount, block.number);
  }

  /*
  * Add nominee for the user
  * @param  {address} _user address of user who had nominated the _msgSender()
  */
  function withdrawAsNominee(address _user) external whenNotPaused {
    // Function should check whether isUserFundReadyForInheritance is True or not
    bool isReady = isUserFundReadyForInheritance(_user);
    require(isReady, "User Fund not Ready For Inheritance");

    // Function should check whether the sender is in nomineeUserDetails mapping or not
    uint share = nomineeUserDetails[_msgSender()][_user];
    require(share > 0, "Nominee share does not exist");

    // Function should Update the OwnerBalance and Nominee Share mapping
    uint nomineeShare = ( userBalance[_msgSender()] * share ) / 100;
    userBalance[_msgSender()] -= nomineeShare;           // Update User net Balance 

    /** Ether Remove the Nominee or Mark their share as 0 for audit purpose */
    delete nomineeUserDetails[_msgSender()][_user];          // Update Nominee Share details
    
    // Remove Nominee data 
    removeNominee(_msgSender(), _user);
    (bool sent, ) = _msgSender().call{value: nomineeShare}("");
    require(sent, "Failed to send Ether");

    emit NomineeFundWithdraw(_user, _msgSender(), nomineeShare, block.number);
  }

  /// @dev withdrawEther allows the contract owner (deployer) to withdraw the ETH/Matic from the contract
  function withdrawEther() external whenPaused onlyOwner {
      payable(owner()).transfer(address(this).balance);
  }

  /*
    * User Sign to prove is alive
    * @param  {address} _user address of user who had nominated the _msgSender()
  */
  function proveIsAlive() external {
    lastSignedBlockNumber[_msgSender()] = block.number;
  }

  /*
    * Validate the user liveness
    * @param  {address} _nominee address of user
    * @return {bool} true / false based on the user's sig duration
  */
  function isAlive(address _user) public view returns(bool) {
    return (getCurrentBlock() - lastSignedBlockNumber[_user]) > 
      _expectedBlocksBetweenTwoSignatures ?  false : true;
  } 

  /*
    * Validate if user funds are ready for Inheritance
    * @param  {address} _nominee address of user
    * @return {bool} true / false based on the user's sig
  */
  function isUserFundReadyForInheritance(address _user) public view 
    returns (bool) {
      return (getCurrentBlock() - lastSignedBlockNumber[_user]) < 
        (2 *_expectedBlocksBetweenTwoSignatures) ?  false : true;
  }

/*
 * Add all the user who had nominated this address as nominee
 * @return {tuple(address, uint)} get the nominee details for the user
 */
  function getNominatedBy() public view returns( NomineeDetails[] memory) {
     
  }
 
 /*
 * check balance for the user
 * @return {uint} account balance of the user
 */
  function checkBalance() external view onlyOwner returns(uint){
    return address(this).balance;
  }

  /*
 * get current block number
 * @return {uint} return the current block number
 */
  function getCurrentBlock() public view returns(uint) {
     return block.number;
  }

  /*
  * get next sign block number
  * @return {uint} return next sign block number
  */
  function getNextSignBlock() public view returns(uint) {
     // Last signed Block number + Sign duration between blocks
     return lastSignedBlockNumber[_msgSender()] + _expectedBlocksBetweenTwoSignatures;
  }

  /*
  * get nominee for the user
  * @return {tuple(address, uint)} get the nominee details for the user
  */
  function getNominee() public view returns( NomineeDetails[] memory) {
     return userNomineeData[_msgSender()];
  }

  /*
  * Emergency Control - Pause
  */
  function pause() external onlyOwner {
    _pause();
  }

  /*
  * Emergency Control - unPause
  * @return {tuple(address, uint)} get the nominee details for the user
  */
  function unpause() external onlyOwner {
    _unpause();
  }

  receive() external payable {
    emit Log(_msgSender(), msg.value);
  }

  fallback() external payable {
    emit Log(_msgSender(), msg.value);
  }

  // function removeElement(NomineeDetails[] storage _nominees, uint _index) internal {
  //    require(_index < _nominees.length, "index out of bound");
  //    for( uint i = _index; i < (_nominees.length - 1); i++){
  //       _nominees[i] = _nominees[i++];
  //    }
  //    _nominees.pop();
  // }
}
