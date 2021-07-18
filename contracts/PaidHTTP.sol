// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PaidHTTP is Ownable {
    mapping (string => uint256) public feeList;

    mapping (address => string) internal invoiceList;

    event Paid(address requester);

    function newInvoice(address visiter, string memory url) public onlyOwner {
        invoiceList[visiter] = url;
    }

    function getMyInvoice() public view returns (string memory url, uint256 fee) {
        url = invoiceList[msg.sender];
        return (url, getFee(url));
    }

    function pay() public payable {
        require(msg.value == getFee(invoiceList[msg.sender]));
        emit Paid(msg.sender);
        newInvoice(msg.sender, ""); // clear invoice
    }

    function setFee(string memory url, uint256 amount) public onlyOwner {
        feeList[url] = amount;
    }

    function getFee(string memory url) public view returns (uint256 fee) {
        return feeList[url];
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
