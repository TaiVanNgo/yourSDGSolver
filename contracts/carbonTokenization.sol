// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarbonCredits {

    mapping(address => uint256) public carbonCreditsBalance;
    mapping(address => uint256) public carbonCreditsVerified;
    mapping(address => string) public projectIds;
    
    // Event to log credit transfer
    event CarbonCreditsTransferred(address indexed from, address indexed to, uint256 amount);

    // Function to mint (issue) new carbon credits
    function mintCarbonCredits(address recipient, uint256 amount, string memory projectId) public {
        carbonCreditsBalance[recipient] += amount;
        projectIds[recipient] = projectId;
        emit CarbonCreditsTransferred(address(0), recipient, amount);
    }

    // Function to verify and transfer credits
    function verifyAndTransfer(address recipient, uint256 amount) public {
        require(carbonCreditsBalance[msg.sender] >= amount, "Not enough carbon credits.");
        
        carbonCreditsBalance[msg.sender] -= amount;
        carbonCreditsBalance[recipient] += amount;
        carbonCreditsVerified[recipient] += amount;
        emit CarbonCreditsTransferred(msg.sender, recipient, amount);
    }

    // Function to get balance of carbon credits
    function getCarbonCreditsBalance(address account) public view returns (uint256) {
        return carbonCreditsBalance[account];
    }
}
