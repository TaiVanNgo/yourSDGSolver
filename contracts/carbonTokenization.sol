// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarbonCredits {
    struct CarbonCredit {
        uint256 carbonAmount;
        string projectId;
        uint256 date;
        address verifiedBy;
        bool isVerified;
    }

    mapping(address => CarbonCredit[]) public userCredits;

    // Event to log credit transfer
    event CarbonCreditsTransferred(address indexed from, address indexed to, uint256 amount);

    // Function to mint (issue) new carbon credits
    function mintCarbonCredits(address recipient, uint256 amount, string memory projectId) public {
        CarbonCredit memory newCredit = CarbonCredit({
            carbonAmount: amount,
            projectId: projectId,
            date: block.timestamp,
            verifiedBy: address(0),
            isVerified: false
        });

        userCredits[recipient].push(newCredit);
        emit CarbonCreditsTransferred(address(0), recipient, amount);
    }

    // Function to verify and transfer credits
    function verifyAndTransfer(address recipient, uint256 index) public {
        require(userCredits[msg.sender].length > index, "Invalid index.");
        require(userCredits[msg.sender][index].carbonAmount > 0, "No carbon credit at this index.");

        userCredits[msg.sender][index].isVerified = true;
        userCredits[recipient].push(userCredits[msg.sender][index]);
        emit CarbonCreditsTransferred(msg.sender, recipient, userCredits[msg.sender][index].carbonAmount);
    }

    // Function to get balance of carbon credits
    function getCarbonCreditsBalance(address account) public view returns (uint256) {
        uint256 balance = 0;
        for (uint i = 0; i < userCredits[account].length; i++) {
            if (userCredits[account][i].isVerified) {
                balance += userCredits[account][i].carbonAmount;
            }
        }
        return balance;
    }
}
