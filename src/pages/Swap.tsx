import type { FunctionComponent } from 'react'
import { useLocation } from 'react-router-dom'

import exit from '../assets/icons/exit.svg'
import swap from '../assets/icons/swap.svg'
import unistoryLogo from '../assets/icons/unistory_logo.svg'
import type { IOrder } from '../models/interfaces'

const TokenOverview: FunctionComponent<any> = (props) => {
  const { data, id, collectionName, collectionAddress, image, deleteToken } = props

  return (
    <div className="flex">
      <div className="aspect-square w-3/5 relative bg-gray-500 mr-6">
        {image ? (
          <img src={image} alt="" />
        ) : (
          <img
            className="absolute inset-1/2 translate-y-center translate-x-center"
            src={unistoryLogo}
            alt=""
            width="38"
            height="38"
          />
        )}
        {!data.tokenSymbol && (
          <img
            onClick={deleteToken}
            className="absolute cursor-pointer right-[-0.75rem] top-[-0.75rem]"
            src={exit}
            alt=""
          />
        )}
      </div>
      <div>
        <div className="font-semibold text-gray-500 text-md mb-2">{collectionName}</div>
        <div className="font-medium text-gray-500 text-2xl mb-6">#{id}</div>
        <div className="font-semibold text-gray-500 text-md">Smart contract</div>
        <div className="font-semibold text-gray-500 text-md">
          {`${collectionAddress.substring(0, 4)}...${collectionAddress.substring(
            collectionAddress.length - 6,
            collectionAddress.length
          )}`}
        </div>
      </div>
    </div>
  )
}
const Swap: FunctionComponent<any> = () => {
  const location = useLocation()

  let state = location.state as IOrder
  state = {
    id: state.id,
    collectionAddress: state.collectionAddress.toLowerCase(),
    image: state.image,
    collectionName: state.collectionName,
    tokenSymbol: state.tokenSymbol,
    offerer: state.offerer,
  }

  return (
    <div className="container mx-auto pt-12">
      <h1 className="font-semibold text-4xl">Swap</h1>
      <div className="flex mt-12">
        <div className="flex-1">
          <h2 className="font-semibold text-2xl mb-9">You will get</h2>
          <TokenOverview
            data={state}
            image={state.image}
            id={state.id}
            collectionName={state.collectionName}
            collectionAddress={state.collectionAddress}
          ></TokenOverview>
        </div>
        <div className="w-25 h-full flex flex-col items-center ">
          <div className="w-16 h-16 mx-24 mt-52">
            <img src={swap} alt="" />
          </div>
          {/* {selectedToken && (
            <button className="font-semibold text-white text-md w-5/12 h-[42px] rounded-xl mt-28 bg-[#1275D3] ">
              {isApprove ? 'Swap NFT' : 'Approve'}
            </button>
          )} */}
        </div>

        <div className="flex-1">
          <h2 className="font-semibold text-2xl mb-9">
            {/* For your {selectedToken?.tokenId} */}
          </h2>
          {/* {selectedToken ? (
            <TokenOverview
              data={selectedToken}
              image={selectedToken.image}
              id={selectedToken.tokenId}
              collectionName={selectedToken.collectionName}
              collectionAddress={selectedToken.contractAddress}
              // deleteToken={deleteSelectedToken}
            ></TokenOverview>
          ) : (
            <div className="aspect-square overflow-auto w-3/4 bg-gray-200 rounded-2xl border-dashed border border-gray-500 p-6 grid grid-cols-2 gap-6 relative">
              {userTokens?.map((token) => (
                <div
                  key={token.tokenId + token.contractAddress}
                  className="aspect-square bg-gray-500 flex-1 cursor-pointer"
                  onClick={() => setSelectedToken(token)}
                >
                  {token.tokenId}
                </div>
              ))}
              {userTokens?.length === 0 && (
                <div className="text-md text-gray-500 font-semibold h-full w-full flex items-center justify-center absolute t-0 l-0">
                  Choose your NFT to swap
                </div>
              )}
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default Swap
