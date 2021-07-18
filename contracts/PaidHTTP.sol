// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PaidHTTP is Ownable {
    mapping (string => uint256) public feesList;
    mapping (address => string) internal ticketsList;

    function strToHash(string memory str) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(str));
    }

    function isStringEmpty(string memory str) internal pure returns (bool) {
        return bytes(str).length == 0;
    }

    function pay(string memory path) public payable {
        require(msg.value == getFee(path));
        require(
            isStringEmpty(ticketsList[msg.sender]),
            "You have not visited the page you paid for."
        );
        ticketsList[msg.sender] = path;
    }

    function checkTicket(address visitor, string memory path) public view onlyOwner returns (bool) {
        return strToHash(ticketsList[visitor]) == strToHash(path);
    }

    function punchTicket(address visitor, string memory path) public onlyOwner {
        require(checkTicket(visitor, path));
        ticketsList[visitor] = "";
    }

    function getTicket(address visitor) public view onlyOwner returns (string memory) {
        return ticketsList[visitor];
    }

    function setFee(string memory path, uint256 amount) public onlyOwner {
        feesList[path] = amount;
    }

    function getFee(string memory path) public view returns (uint256) {
        return feesList[path];
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
