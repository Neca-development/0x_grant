import NftCard from "../components/NftCard";
import { IToken } from "../models/interfaces";

function FreeNft() {
  const tokens: IToken[] = [
    {
      tokenId: 1,
      symbol: "UNIC",
      image: "",
      collectionName: "UNIC",
      contractAddress: "1",
    },
    {
      tokenId: 2,
      symbol: "UNIS",
      image: "",
      collectionName: "UNIS",
      contractAddress: "2",
    },
  ];

  return (
    <div className="container mx-auto pt-12 bg-white">
      <h1 className="text-center mb-14 font-semibold text-6xl w-3/4 mx-auto leading-snug">
        Get free NFT
      </h1>
      <div className="flex justify-around">
        {tokens.map((token) => (
          <NftCard
            key={token.tokenId + token.contractAddress}
            data={token}
          ></NftCard>
        ))}
      </div>
    </div>
  );
}

export default FreeNft;
