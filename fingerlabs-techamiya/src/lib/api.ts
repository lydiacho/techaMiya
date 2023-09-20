import { ethers } from "ethers";

export const provider = new ethers.JsonRpcProvider(
  "https://klaytn-api.fingerlabs.io"
);
export const techaMiyaContractAddress =
  "0x5ffc2d8d30c3182b3e8a37d2372dd337b447a6bc";
export const techaMiyaABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
