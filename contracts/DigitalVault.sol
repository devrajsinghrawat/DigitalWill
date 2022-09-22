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
  */
  function removeNominee(address _nominee) public { 
    // Customer should able to add nominee and their % share
    if (_nominee == address(0))       // non Null Check
      revert NullAddress();

    // Function should Update the OwnerNomineeData mapping 
    uint index = nomineeUserDetails[_nominee][_msgSender()];
    NomineeDetails[] storage _nominees = userNomineeData[_msgSender()];
    // delete nominee[index];
    // removeElement(nominee, index);
     require(index < _nominees.length, "index out of bound");
     for( uint i = index; i < (_nominees.length - 1); i++){
        _nominees[i] = _nominees[i + 1];
        nomineeUserDetails[_nominees[i].nominee][_msgSender()] = i;
     }
     _nominees.pop();

    // remove Nominee and User link
    require(nomineeUserDetails[_nominee][_msgSender()] >= 0, "invalid nominee address"); 
    delete nomineeUserDetails[_nominee][_msgSender()];
 
    emit NomineeRemoved(_msgSender(), _nominee);
  }

  /*
  * User should able to deposit funds into Vault
  */
  function deposit() external payable {
    if(msg.value <= 0)
      revert ZeroAmountError(msg.value);

  // Update user Balance 
    userBalance[_msgSender()] += msg.value;
    emit FundDeposited(_msgSender(), msg.value, block.number);
  }

  /*
  * User or Nominee can withdraw their allocated funds
  */
  function withdraw(uint amount) external whenNotPaused {
    // add logic
    // Using this function users and nominee should be able to withdraw their funds
    // Function should check if the user has sufficient balance or not
    if(userBalance[msg.sender] < amount)
      revert InsufficentBalanceError(userBalance[msg.sender], amount);

    userBalance[msg.sender] -= amount;
    (bool sent, bytes memory data) = (msg.sender).call{value: amount}("");
    require(sent, "Failed to send Ether");
    // payable (msg.sender).transfer(amount);
    emit FundWithdraw(msg.sender, amount, block.number);

    // Function should check whether isUserFundReadyForInheritance is True or not
    // Function should check whether the sender is in nomineeUserDetails mapping or not
    // Function should Update the OwnerBalance mapping
    // Function should emit event FundWithdrawal(sender, amount)
    // Get the user details using nomineeUserDetails[_msgSender()] and then check the %share he owns userNomineeData[user][_msgSender()]
  }

/*
  * User Sign to prove is alive
  * @param  {address} _user address of user who had nominated the msg.sender
  */
  function proveIsAlive() external {
    lastSignedBlockNumber[msg.sender] = block.number;
  }

  /*
  * Add nominee for the user
  * @param  {address} _user address of user who had nominated the msg.sender
  */
  function withdrawAsNominee(address _user) external whenNotPaused {
    // // add logic
    // // Using this function users and nominee should be able to withdraw their funds
    // // Function should check if the user has sufficient balance or not
    // if(userBalance[msg.sender] < amount)
    //   revert InsufficentBalanceError(userBalance[msg.sender], amount);

    // userBalance[msg.sender] -= amount;
    // (bool sent, bytes memory data) = (msg.sender).call{value: amount}("");
    // require(sent, "Failed to send Ether");
    // // payable (msg.sender).transfer(amount);
    // emit FundWithdraw(msg.sender, amount, block.number);

    // Function should check whether isUserFundReadyForInheritance is True or not
    bool isReady = isUserFundReadyForInheritance(_user);
    require(isReady, "User Fund not Ready For Inheritance");

    // Function should check whether the sender is in nomineeUserDetails mapping or not
    uint share = nomineeUserDetails[msg.sender][_user];
    require(share > 0, "Nominee share does not exist");

    // Function should Update the OwnerBalance and Nominee Share mapping
    uint nomineeShare = ( userBalance[msg.sender] * share ) / 100;
    userBalance[msg.sender] -= nomineeShare;           // Update User net Balance 

    /** Ether Remove the Nominee or Mark their share as 0 for audit purpose */
    nomineeUserDetails[msg.sender][_user] = 0;          // Update Nominee Share details
    NomineeDetails[] storage _nominees = userNomineeData[_user];

    // Function should emit event FundWithdrawal(sender, amount)
    // Get the user details using nomineeUserDetails[_msgSender()] and then check the %share he owns userNomineeData[user][_msgSender()]

  }

  /// @dev withdrawEther allows the contract owner (deployer) to withdraw the ETH/Matic from the contract
  function withdrawEther() external onlyOwner {
      payable(owner()).transfer(address(this).balance);
  }

  /*
  * Validate the user liveness
  * @param  {address} _nominee address of user
  * @return {bool} true / false based on the user's sig
  */
  function isAlive(address user) public returns(bool) {
    // add logic
    // Current Block - LastSignedBlock > expectedBlocksBetweenTwoSignatures   Return False 
    // Else  Current Block - LastSignedBlock < expectedBlocksBetweenTwoSignatures   Return True 
  } 

  /*
  * Validate if user funds are ready for Inheritance
  * @param  {address} _nominee address of user
  * @return {bool} true / false based on the user's sig
  */
  function isUserFundReadyForInheritance(address user) public returns (bool) {
    // add logic
    // Current Block - LastSignedBlock < 2 x expectedBlocksBetweenTwoSignatures   Return False Else  
    // Current Block - LastSignedBlock > 2 x expectedBlocksBetweenTwoSignatures   Return True
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

/*
 * Add nominee for the user
 * @return {tuple(address, uint)} get the nominee details for the user
 */
  function getNominee() public view returns( NomineeDetails[] memory) {
     return userNomineeData[_msgSender()];
  }
 
 /*
 * check balance for the user
 * @return {uint} account balance of the user
 */
  function checkBalance() external view onlyOwner returns(uint){
    return address(this).balance;
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