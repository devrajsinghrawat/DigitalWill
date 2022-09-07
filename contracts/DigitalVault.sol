// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DigitalVault is Ownable, Pausable {
  // address public owner;
  mapping (address => uint) public userBalance;

  // should hold nominee and their %
    struct NomineeDetails {
        address nominee;
        uint share;
    } 
  // user and nominee link
  mapping(address => NomineeDetails[]) public userNomineeData;

  // Info Last Signed Block 
  mapping (address => uint) public lastSignedBlockNumber; 

  uint private _expectedBlocksBetweenTwoSignatures;          // SignatureDuration

  // Nominee - 
  // To track nominee and user link
  mapping(address => address) public nomineeUserDetails;

  error NullAddress();
  error InvalidShare(string, uint);

  event nomineeAdded(address indexed _n);
  event nomineeRemoved(address indexed _n);
  event Log(address sender, uint value);

  constructor(uint _signatureDuration) Ownable() {
    _expectedBlocksBetweenTwoSignatures = _signatureDuration;
  }

 /*
 * Add nominee for the user
 * @param  {address} _n address of nominee
 * @param  {uint} _s % share for the nominee
 */
  function addNominee(address _n, uint _s) public {
    if (_n == address(0))       // non Null Check
      revert NullAddress();
    if (_s > 100)               // %Share Check 
      revert InvalidShare("invalid share", _s);  

    // Get nominees 
    NomineeDetails[] memory nomineeData = getNominee();
    uint netShare = _s;
    for(uint i = 0; i < nomineeData.length; i++) {
      netShare += nomineeData[i].share;
    }

    if (netShare > 100)       // Net %Share check  
      revert InvalidShare("invalid share", _s);  

    NomineeDetails[] storage nominee = userNomineeData[msg.sender];
    nominee.push(NomineeDetails(_n, _s));
    nomineeUserDetails[_n] = msg.sender; // Set Nominee and User link
    emit nomineeAdded(_n);
    // OR
    // userNomineeData[msg.sender].push(NomineeDetails(_n, _s));
  }
 
/*
 * Add nominee for the user
 * @return {tuple(address, uint)} get the nominee details for the user
 */
  function deposit() external {

  }

/*
 * User or Nominee can withdraw their allocated funds
 * @return {tuple(address, uint)} get the nominee details for the user
 */
  function withdraw() external whenNotPaused {

  }

/*
 * Emergency Control - Pause
 * @return {tuple(address, uint)} get the nominee details for the user
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
     return userNomineeData[msg.sender];
  }
 
 /*
 * check balance for the user
 * @return {uint} account balance of the user
 */
  function checkBalance() external view onlyOwner returns(uint){
    return address(this).balance;
  }

  receive() external payable {
    emit Log(tx.origin, msg.value);
  }

  fallback() external payable {
    emit Log(tx.origin, msg.value);
  }  

}
