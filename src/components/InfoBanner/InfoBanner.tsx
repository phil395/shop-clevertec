import type { FC } from "react";
import { Icon } from "../Icon";
import { HOME_BANNER, PRODUCT_BANNER } from './content';

interface Props {
	type: 'product-page' | 'home-page';
}

export const InfoBanner: FC<Props> = ({ type }) => {
	if (type === 'product-page') {
		return (
			<div className="flex flex-wrap flex-center space-x-3 text-dark/60 text-sm">
				{PRODUCT_BANNER.map(({ icon, text }, index) => (
					<span key={index} className="whitespace-nowrap pt-2">
						<Icon name={icon} size={23} className="-mt-1 mr-1" />
						{text}
					</span>
				))}
			</div>
		);
	}

	return (
		<div className="mt-6 flex max-lg:flex-col items-center justify-between lg:space-x-3">
			{HOME_BANNER.map(({ icon, text, title }, index) => (
				<div key={index} className="py-3 grid gap-x-3 grid-cols-[40px,1fr] auto-rows-auto">
					<Icon name={icon} size={45} className="-mt-1 mr-1 row-span-2 place-self-center" />
					<span className="uppercase font-semibold">{title}</span>
					<span>{text}</span>
				</div>
			))}
		</div>
	);
};
