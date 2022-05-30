import { useNavigate } from "react-router";
import Button from "../components/Button";
import TokenCard from "../components/TokenCard";

function Home() {
	let navigate = useNavigate();

	return (
		<div className="container mx-auto pt-12">
			<div className="flex justify-between">
				<input
					type="search"
					name=""
					id=""
					className="bg-slate-200 py-2 px-4 w-1/3"
				/>
				<Button text="Create order"></Button>
			</div>
			<div className="grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 xl gap-4 mt-10">
				{Array(20)
					.fill(0, 0, 20)
					.map(() => (
						<TokenCard onClick={() => navigate("/swap")}></TokenCard>
					))}
			</div>
		</div>
	);
}

export default Home;
