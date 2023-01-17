import type { FC } from "react";
import { Icon } from "../Icon";

interface Props {
	type: 'product-page' | 'home-page';
}

export const InfoBanner: FC<Props> = ({ type }) => {
	if (type === 'product-page') {
		return (
			<div className="flex flex-wrap flex-center space-x-3 text-dark/60 text-sm">
				<span className="whitespace-nowrap pt-2">
					<Icon name="truck" size={23} className="-mt-1 mr-1" />
					Shipping & Delivery
				</span>
				<span className="whitespace-nowrap pt-2">
					<Icon name="refresh" size={23} className="-mt-1 mr-1" />
					Returns & Exchanges
				</span>
				<span className="whitespace-nowrap pt-2">
					<Icon name="mail" size={23} className="-mt-1 mr-1" />
					Ask a question
				</span>
			</div>
		);
	}

	return (
		<div className="flex justify-between">
			<div className="py-4 grid gap-x-3 grid-cols-[40px,1fr] auto-rows-auto">
				<Icon name="truck" size={45} className="-mt-1 mr-1 row-span-2 place-self-center" />
				<span className="uppercase font-semibold">FREE SHIPPING</span>
				<span>On all UA order or order above $100</span>
			</div>
			<div className="py-4 grid gap-x-3 grid-cols-[40px,1fr] auto-rows-auto">
				<Icon name="refresh" size={45} className="-mt-1 mr-1 row-span-2 place-self-center" />
				<span className="uppercase font-semibold">FREE SHIPPING</span>
				<span>On all UA order or order above $100</span>
			</div>
			<div className="py-4 grid gap-x-3 grid-cols-[40px,1fr] auto-rows-auto">
				<Icon name="mail" size={45} className="-mt-1 mr-1 row-span-2 place-self-center" />
				<span className="uppercase font-semibold">FREE SHIPPING</span>
				<span>On all UA order or order above $100</span>
			</div>
		</div>
	);
};
