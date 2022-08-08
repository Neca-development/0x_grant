
import { useNavigate } from 'react-router-dom'
import searchIcon from '../assets/icons/search.svg'
import Button from '../components/Button'
// import OrderCard from '../components/OrderCard'
// import Spinner from '../components/Spinner'

function Home() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto pt-12">
      <h1 className="text-center mt-20 mb-32 font-bold text-6xl w-3/4 mx-auto leading-snug">
        New <span className="text-blue"> NFT swap </span> project <br /> Create an order
        or offer your
        <span className="text-blue">
          {' '}
          NFT <br />
        </span>{' '}
        to the existing
      </h1>
      <div className="flex justify-between">
        <div className="bg-white rounded border-black border py-2 py-3 px-4 w-1/3 flex items-center">
          <img width="16" height="17" src={searchIcon} alt="" className="mr-3" />
          <input
            type="text"
            name=""
            id=""
            className="flex-1 text-dark-gray font-semibold self-stretch focus:outline-none placeholder:text-dark-gray"
            placeholder="Search by smart-contract adress"
          />
        </div>
        <Button onClick={()=>navigate('create-order')} text="Create order"></Button>
      </div>
      {/* {!filteredOrders && (
        <div className="my-20">
          <Spinner></Spinner>
        </div>
      )} */}
      <div className="grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl gap-4 mt-10">
        {/* {filteredOrders?.map((order) => (
          <OrderCard
            key={order.id + order.collectionAddress}
            data={order}
            onClick={() => navigate('/swap', { state: order })}
          ></OrderCard>
        ))} */}
      </div>
    </div>
  )
}

export default Home
