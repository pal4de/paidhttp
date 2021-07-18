// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PaidHTTP is Ownable {
    mapping (string => uint256) public feesList;
    mapping (address => string) internal ticketsList;

    function pay(string memory url) public payable {
        require(msg.value == getFee(url));
        require(
            keccak256(abi.encodePacked(ticketsList[msg.sender])) != keccak256(""),
            "You have not visited the page you paid for."
        );
        ticketsList[msg.sender] = url;
    }

    function punchTicket(address visitor) public onlyOwner {
        ticketsList[visitor] = "";
    }

    function setFee(string memory url, uint256 amount) public onlyOwner {
        feesList[url] = amount;
    }

    function getFee(string memory url) public view returns (uint256 fee) {
        return feesList[url];
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
