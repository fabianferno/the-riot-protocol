import { ABI, contractAddress } from "./constants";
import contractCall from "./contract-call";

const homePageData = [
  {
    title: "Read Pure function",
    action: async (currentAccount) => {
      console.log("HI");
      return [
        await contractCall(
          contractAddress,
          currentAccount,
          ABI,
          [],
          0,
          "name()",
          true
        ),
      ];
    },
  },
  {
    title: "Read Pure function with params",
    action: async (currentAccount) => {
      console.log("HI");
      return [
        await contractCall(
          contractAddress,
          currentAccount,
          ABI,
          [
            "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
          ],
          0,
          "getName(bytes32)",
          true
        ),
      ];
    },
  },
  {
    title: "Read View function with struct return type",
    action: async (currentAccount) => {
      console.log("HI");
      return [
        await contractCall(
          contractAddress,
          currentAccount,
          ABI,
          ["0"],
          0,
          "getAnalytics(uint)",
          true
        ),
      ];
    },
  },
  {
    title: "Write Function",
    action: async (currentAccount) => {
      console.log("HI");
      return [
        await contractCall(
          contractAddress,
          currentAccount,
          ABI,
          [currentAccount, "Maja pa Maja"],
          0,
          "safeMint(address,string)",
          false
        ),
      ];
    },
  },
];
export default homePageData;
