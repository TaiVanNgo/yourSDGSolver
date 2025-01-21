const hre = require("hardhat");

async function main() {
    const CarbonCredits = await hre.ethers.getContractFactory("CarbonCredits");
    const carbonCredits = await CarbonCredits.deploy();
    await carbonCredits.deployed();

    console.log("CarbonCredits contract deployed to:", carbonCredits.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
