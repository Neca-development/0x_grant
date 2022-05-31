import { FunctionComponent } from "react";
import unistoryLogo from "../assets/icons/unistory_logo.svg";
import { useBuyUNIC, useBuyUNIS } from "../hooks/useMint";
import { IToken } from "../models/interfaces";

export interface ITokenCardProps {
  data: IToken;
  onClick?(): void;
  externalClasses?: string[];

}

const NftCard: FunctionComponent<ITokenCardProps> = (props) => {
  const { data, onClick, externalClasses } = props;

  const { state: unicState, send: mintUNIC } = useBuyUNIC();
  const { state: unis, send: mintUNIS} = useBuyUNIS();


  function mintHandler(){
    if(data.symbol === 'UNIC'){
       mintUNIC();
    }else{
      mintUNIS();
    }
  }

  return (
    <article
      onClick={onClick}
      className={`rounded-lg overflow-hidden border border-gray-100 shadow-[4px_4px_10px_rgba(224,224,224,0.25)] ${externalClasses}`}
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
        <input
        value={1}
        disabled={true}
          className="w-full py-2 text-center font-semibold text-black border-0 border-b-2 border-[rgba(20,20,20,1)] focus:border-0 focus:border-b-2 focus:ring-0 focus:outline-0"
          type="text"
          placeholder="Enter the amount of NFT"
          pattern="^[0-9]+$"
        />
        <button className="w-fit my-6 py-3 px-8 rounded-lg bg-blue text-white font-semibold" onClick={mintHandler}>
          Mint NFT
        </button>
      </div>
    </article>
  );
};

export default NftCard;
