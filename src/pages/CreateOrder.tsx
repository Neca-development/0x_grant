import Button from '../components/Button'
// import Spinner from '../components/Spinner'
// import TokenCard from '../components/TokenCard'

function CreateOrder() {
  return (
    <div className="container mx-auto pt-12">
      <h1 className="font-semibold text-4xl">Create order</h1>
      <h2 className="font-semibold text-2xl mt-12">Choose NFT to order creation</h2>
      {/* {!userTokens && (
        <div className="my-20">
          <Spinner></Spinner>
        </div>
      )} */}
      <div className="grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl gap-4 mt-10">
        {/* {userTokens?.map((token) => (
          <TokenCard
            key={token.tokenId + token.contractAddress}
            data={token}
            onClick={() => setTokenForSwap(token)}
            externalClasses={[isTokenSelected(token)]}
          ></TokenCard>
        ))} */}
      </div>
      <h2 className="font-semibold text-2xl mt-12">Swap to</h2>
      <input
        type="text"
        placeholder="Enter collection smart-contract adress"
        className="rounded border border-black py-3 px-4 text-gray-600 font-semibold mt-8 w-1/3"
      />
      <br />
      <Button text="Create order" externalClasses={['bg-blue mt-12']}></Button>
    </div>
  )
}

export default CreateOrder
