import Button from "./Button";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import unistoryLogo from "../assets/icons/unistory_logo_dark.svg";
import { Link } from "react-router-dom";
import { useMemo } from "react";

function Header() {
	const { activateBrowserWallet, account } = useEthers();
	const balance = useEtherBalance(account);

	const walletAddress = useMemo(
		() =>
			`${account?.substring(0, 4)}...${account?.substring(
				account.length - 5,
				account.length
			)}`,
		[account]
	);

	return (
		<header className="shadow-[0px_4px_10px_rgba(192,192,192,0.25)]">
			<div className="container flex justify-between items-center mx-auto py-5">
				<Link to="/" className="flex items-center">
					<img src={unistoryLogo} alt="" />
					<span className="font-semibold text-2xl ml-3">NFT 2 NFT</span>
				</Link>
				{account ? (
					<div>
						<span className="font-semibold mr-4">{walletAddress}</span>
						<span className="font-semibold mr-4">{balance?.toString()}</span>
						<Link to="/my-orders">
							<Button text={"My orders"}></Button>
						</Link>
					</div>
				) : (
					<Button
						onClick={() => activateBrowserWallet()}
						text={"Connect wallet"}
					></Button>
				)}
			</div>
		</header>
	);
}

export default Header;
