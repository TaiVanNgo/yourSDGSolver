// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface VerraCarbonCredit {
    function checkEligible(address vintageToken) external view returns (bool);
    function deposit(address tco2, uint256 amount, uint256 maxFee) external returns (uint256);
    function retire(uint256 amount) external returns (uint256);
    function retireAndMintCertificate(
        string calldata retiringEntityString,
        address beneficiary,
        string calldata beneficiaryString,
        string calldata retirementMessage,
        uint256 amount
    ) external;
}

contract CarbonCreditConverter {
    address public owner;
    VerraCarbonCredit public verra;

    event CarbonCreditsIssued(address indexed farmer, uint256 credits);

    constructor(address _verraContract) {
        owner = msg.sender;
        verra = VerraCarbonCredit(_verraContract);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function convertToCarbonCredits(
        address tco2,
        uint256 carbonAmount,
        uint256 maxFee
    ) external returns (uint256) {
        require(carbonAmount > 0, "Invalid carbon amount");
        
        // Check if the carbon asset is eligible for carbon credits
        require(verra.checkEligible(tco2), "Token not eligible for carbon credits");

        // Deposit the carbon sequestration amount to get carbon credits
        uint256 credits = verra.deposit(tco2, carbonAmount, maxFee);
        
        emit CarbonCreditsIssued(msg.sender, credits);

        return credits;
    }

    function retireCredits(
        string calldata entity,
        address beneficiary,
        string calldata message,
        uint256 amount
    ) external {
        require(amount > 0, "Invalid retirement amount");

        // Retire the credits and mint a certificate for the farmer
        verra.retireAndMintCertificate(entity, beneficiary, "Carbon Offset Beneficiary", message, amount);
    }

    function withdrawFunds() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {}
}
