import type { FC } from "react";
import { Icon } from "../Icon";

interface Props {
	discount: number;
	priceBase: number;

}

export const ProductCTA: FC<Props> = ({ discount, priceBase }) => {
	return (
		<div className="flex space-x-4 items-center">
			{discount ? (
				<div className="flex-center flex-col">
					<del className="leading-none">$&nbsp;{priceBase}</del>
					<span className="text-2xl leading-none font-semibold">$&nbsp;{(priceBase * discount / 100).toFixed(2)}</span>
				</div>
			) : (
				<span className="text-xl font-semibold">$&nbsp;{priceBase}</span>
			)}

			<button className="px-4 py-2 text-sm font-semibold uppercase bg-dark text-white outline-offset-2 whitespace-nowrap">Add To Card</button>

			<Icon name="heart" size={25} />
			<Icon name="scale" size={25} />
		</div>
	);
};
