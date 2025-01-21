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

    function storeCarbonCredits(
        address user,
        uint256 carbonAmount,
        string memory projectId,
        uint256 date,
        address verifiedBy
    ) public {
        CarbonCredit memory newCredit = CarbonCredit({
            carbonAmount: carbonAmount,
            projectId: projectId,
            date: date,
            verifiedBy: verifiedBy,
            isVerified: false
        });

        userCredits[user].push(newCredit);
    }

    function verifyCarbonCredit(address user, uint256 index) public {
        userCredits[user][index].isVerified = true;
    }
}
