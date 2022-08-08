// import Spinner from '../components/Spinner'

function MyOrders() {
  return (
    <div className="container mx-auto pt-12">
      <h1 className="font-semibold text-4xl">My orders</h1>
      <section>
        <h2 className="font-semibold text-2xl mt-12">Here you can check your orders</h2>
        {/* {!orders && (
          <div className="my-20">
            <Spinner></Spinner>
          </div>
        )} */}
        <div className="grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl gap-4 mt-10">
          {/* {orders
            ?.filter((order) => order.offerer.toLowerCase() === account?.toLowerCase())
            .map((order) => (
              <OrderCard
                key={`${order.id}${order.collectionAddress}`}
                data={order}
              ></OrderCard>
            ))} */}
        </div>
      </section>
      <section>
        <h2 className="font-semibold text-2xl mt-12">
          For your NFT #00000 you got next offers:
        </h2>
        <div className="grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl gap-4 mt-10">
          {/* {orders?.map((order) => (
            <OrderCard
              key={`${order.id}${order.collectionAddress}`}
              data={order}
            ></OrderCard>
          ))} */}
        </div>
      </section>
    </div>
  )
}

export default MyOrders
