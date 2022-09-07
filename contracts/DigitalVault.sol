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
  error ZeroAmountError(uint txAmount);
  error InvalidShare(string message, uint share);

  event fundDeposited(address indexed depositor, uint amount, uint DepositBlockNumber);
  event fundWithdraw(address indexed withdrawer, uint amount, uint WithdrawalBlockNumber);
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

    NomineeDetails[] storage nominee = userNomineeData[_msgSender()];
    nominee.push(NomineeDetails(_n, _s));
    nomineeUserDetails[_n] = _msgSender(); // Set Nominee and User link
    emit nomineeAdded(_n);
    // OR
    // userNomineeData[_msgSender()].push(NomineeDetails(_n, _s));
  }

  /*
  * remove nominee for the user
  * @param  {address} _n address of nominee
  */
  function removeNominee(address _n) public { 
    // add logic
  }

  /*
  * User should able to deposit funds into Vault
  */
  function deposit() external payable {
    if(msg.value <= 0)
      revert ZeroAmountError(msg.value);

  // Update user Balance 
    userBalance[_msgSender()] = msg.value;
    emit fundDeposited(_msgSender(), msg.value, block.number);
  }

  /*
  * User or Nominee can withdraw their allocated funds
  */
  function withdraw() external whenNotPaused {
    // add logic
    // Using this function users and nominee should be able to withdraw their funds
    // Function should check if the user has sufficient balance or not
    // Function should check whether isUserFundReadyForInheritance is True or not
    // Function should check whether the sender is in nomineeUserDetails mapping or not
    // Function should Update the OwnerBalance mapping
    // Function should emit event FundWithdrawal(sender, amount)
    // Get the user details using nomineeUserDetails[_msgSender()] and then check the %share he owns userNomineeData[user][_msgSender()]

  }

  /*
  * Validate the user liveness
  * @param  {address} _n address of user
  * @return {bool} true / false based on the user's sig
  */
  function isAlive(address user) public returns(bool) {
    // add logic
    // Current Block - LastSignedBlock > expectedBlocksBetweenTwoSignatures   Return False 
    // Else  Current Block - LastSignedBlock < expectedBlocksBetweenTwoSignatures   Return True 
  } 

  /*
  * Validate if user funds are ready for Inheritance
  * @param  {address} _n address of user
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
}