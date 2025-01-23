// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CarbonSequestrationNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    using Strings for uint256;
    using Strings for int256;

    Counters.Counter private _tokenIds;

    struct Data {
        uint256 soilCarbonContent;   // in tons per hectare
        uint256 biomassGrowth;       // in tons per hectare per year
        uint256 leafAreaIndex;       // dimensionless
        int256 co2Flux;              // in tons of CO2 per hectare per year
        uint256 methane;             // in tons per hectare per year
        uint256 nitrousOxide;        // in tons per hectare per year
    }

    mapping(uint256 => Data) private _data;

    uint256 constant GWP_CH4 = 25;  // Global Warming Potential for Methane
    uint256 constant GWP_N2O = 298; // Global Warming Potential for Nitrous Oxide
    uint256 constant carbonFractionBiomass = 5;  // 50% (0.5 * 100 for precision)
    uint256 constant carbonContentSoilFactor = 15; // 0.0015 * 10000 for precision

    constructor() ERC721("CarbonSequestrationNFT", "CSNFT") {}

    function mintEnvironmentalDataNFT(
        address recipient,
        Data memory data,
        string memory tokenURI
    ) public returns (uint256) {
        uint256 newDataId = _tokenIds.current();

        // Store the environmental data on-chain
        _data[newDataId] = data;

        // Mint the token and set its metadata URI
        _mint(recipient, newDataId);
        _setTokenURI(newDataId, tokenURI);

        _tokenIds.increment();
        return newDataId;
    }

    // function getEnvironmentalData(uint256 tokenId) public view returns (Data memory) {
    //     require(_exists(tokenId), "Token does not exist");
    //     return _data[tokenId];
    // }

    function calculateCarbonSequestration(Data[] memory dataArray)
        public
        pure
        returns (
            uint256 totalSequestered,
            uint256 totalEmissions,
            uint256 totalCarbonCredits,
            uint256 averageSequestration,
            uint256 averageEmissions,
            uint256 averageCredits
        )
    {
        uint256 totalSequesteredSum;
        int256 totalEmissionsSum;
        uint256 totalCarbonCreditsSum;

        uint256 dataLength = dataArray.length;

        for (uint256 i = 0; i < dataLength; i++) {
            uint256 totalSequestration = calculateSequestration(dataArray[i]);
            int256 emissions = calculateEmissions(dataArray[i]);

            uint256 carbonCredits = 0;
            if (emissions < int256(totalSequestration)) {
                carbonCredits = uint256(int256(totalSequestration) - emissions) / 1000;
            }

            totalSequesteredSum += totalSequestration;
            totalEmissionsSum += emissions;
            totalCarbonCreditsSum += carbonCredits;
        }

        totalSequestered = totalSequesteredSum;
        totalEmissions = uint256(totalEmissionsSum);
        totalCarbonCredits = totalCarbonCreditsSum;

        averageSequestration = totalSequesteredSum / dataLength;
        averageEmissions = uint256(totalEmissionsSum) / dataLength;
        averageCredits = totalCarbonCreditsSum / dataLength;
    }

    function calculateSequestration(Data memory data) private pure returns (uint256) {
        uint256 soilSequestration = (data.soilCarbonContent * carbonContentSoilFactor) / 10;
        uint256 biomassSequestration = (data.biomassGrowth * carbonFractionBiomass * 44) / 12;
        uint256 leafSequestration = (data.leafAreaIndex * carbonFractionBiomass * 44) / 12;

        return soilSequestration + biomassSequestration + leafSequestration;
    }

    function calculateEmissions(Data memory data) private pure returns (int256) {
        return data.co2Flux + int256(data.methane * GWP_CH4) + int256(data.nitrousOxide * GWP_N2O);
    }

    function createTokenURI(Data memory data, string memory baseURI) public pure returns (string memory) {
        return string(abi.encodePacked(
            baseURI,
            "?soil_carbon_content=", data.soilCarbonContent.toString(),
            "&biomass_growth=", data.biomassGrowth.toString(),
            "&leaf_area_index=", data.leafAreaIndex.toString(),
            // "&co2_flux=", int256(data.co2Flux).toString(),
            "&co2_flux=", data.co2Flux,

            "&methane=", data.methane.toString(),
            "&nitrous_oxide=", data.nitrousOxide.toString()
        ));
    }
}
