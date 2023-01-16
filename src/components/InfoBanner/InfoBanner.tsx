import type { FC } from "react";
import { Icon } from "../Icon";

interface Props {
	type: 'product-page' | 'home-page';
}

export const InfoBanner: FC<Props> = ({ type }) => {
	if (type === 'product-page') {
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
		</div>;
	}

	return null;
};
