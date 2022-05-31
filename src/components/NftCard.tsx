import { FunctionComponent, useMemo } from "react";
import unistoryLogo from "../assets/icons/unistory_logo.svg";
import { IToken } from "../models/interfaces";

export interface ITokenCardProps {
  data: IToken;
  onClick?(): void;
  externalClasses?: string[];
}

const NftCard: FunctionComponent<ITokenCardProps> = (props) => {
  const { data, onClick, externalClasses } = props;

  const contractAddress = useMemo(
    () =>
      `${data.collectionAddress?.substring(
        0,
        4
      )}...${data.collectionAddress?.substring(
        data.collectionAddress.length - 6,
        data.collectionAddress.length
      )}`,
    [data.collectionAddress]
  );

  return (
    <article
      onClick={onClick}
      className={`rounded-lg overflow-hidden border border-gray-100 shadow-[4px_4px_10px_rgba(224,224,224,0.25)] cursor-pointer ${externalClasses}`}
    >
      <div className="aspect-square bg-gray-200 relative flex">
        {data.image ? (
          <img className="w-[25rem] h-[25rem]" src={data.image} />
        ) : (
          <img
            className="absolute inset-1/2 translate-y-center translate-x-center"
            src={unistoryLogo}
            alt=""
            width="37"
            height="38"
          />
        )}
      </div>
      <div className="px-6 flex flex-col items-center">
        <div className="text-xl text-center text-dark-gray font-semibold mt-10 mb-4">
          {data.collectionName}
        </div>
        {/* <div className="text-dark-gray font-semibold mb-3"> */}
          <input
            className="w-full py-1 text-center border-0 border-b-2 border-[rgba(20,20,20,1)] focus:border-0 focus:border-b-2 focus:border-black focus:ring-0"
            type="text"
            placeholder="Enter the amount of NFT"
            pattern="^[0-9]+$"
          />
        {/* </div> */}
        <button className="w-fit my-6 py-2 px-6 rounded-lg bg-blue text-white font-semibold">
          Mint NFT
        </button>
      </div>
    </article>
  );
};

export default NftCard;
