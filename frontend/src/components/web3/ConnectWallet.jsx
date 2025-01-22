import { useAccount, useReadContract } from "wagmi";
import { Account } from "./Account";
import { WalletButton } from "./WalletButton";

// const wagmiContractConfig = {
//   address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
//   abi: [
//     {
//       inputs: [
//         {
//           components: [
//             {
//               internalType: "uint256",
//               name: "Soil_Carbon_Content",
//               type: "uint256",
//             },
//             {
//               internalType: "uint256",
//               name: "Biomass_Growth",
//               type: "uint256",
//             },
//             {
//               internalType: "uint256",
//               name: "Leaf_Area_Index",
//               type: "uint256",
//             },
//             {
//               internalType: "int256",
//               name: "CO2_Flux",
//               type: "int256",
//             },
//             {
//               internalType: "uint256",
//               name: "Methane",
//               type: "uint256",
//             },
//             {
//               internalType: "uint256",
//               name: "Nitrous_Oxide",
//               type: "uint256",
//             },
//           ],
//           internalType: "struct CarbonSequestrationVerra.Data[]",
//           name: "dataArray",
//           type: "tuple[]",
//         },
//       ],
//       name: "calculateCarbonSequestration",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "totalSequestered",
//           type: "uint256",
//         },
//         {
//           internalType: "uint256",
//           name: "totalEmissions",
//           type: "uint256",
//         },
//         {
//           internalType: "uint256",
//           name: "totalCarbonCredits",
//           type: "uint256",
//         },
//         {
//           internalType: "uint256",
//           name: "averageSequestration",
//           type: "uint256",
//         },
//         {
//           internalType: "uint256",
//           name: "averageEmissions",
//           type: "uint256",
//         },
//         {
//           internalType: "uint256",
//           name: "averageCredits",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "pure",
//       type: "function",
//     },
//   ],
// };

const wagmiContractConfig = {
  address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
  abi: [
    {
      inputs: [],
      name: "hellohuhu",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
  ],
};

const ConnectWallet = () => {
  const { data, isLoading, error } = useReadContract({
    ...wagmiContractConfig,
    functionName: "hellohuhu",
    address: "0x9EdF134821A89e84c7D80f13d2f4dB3083e6f980",
  });

  console.log("data", data);

  // const data = useReadContract({
  //   ...wagmiContractConfig,
  //   functionName: "calculate",
  //   args: ["0x87D651C2093077a3348B5a4dF639E4E1c9cB8F59"],
  // });

  // const { isConnected } = useAccount();
  // if (isConnected) return <Account />;

  // return <WalletButton />;

  console.log(data);
  return <div>Balance: {data}</div>;
};
export default ConnectWallet;
