import type { FC } from "react";
import { IProductCard, ProductCard } from "../ProductCard";

interface Props {
	className?: string;
	cards: IProductCard[];
}

export const Showcase: FC<Props> = ({ cards, className }) => {
	return (
		<div className={"flex flex-wrap xs:-px-2 lg:-mx-4 " + className}>
			{cards.map(card => (
				<ProductCard {...card} className="basis-1/2 md:basis-1/3 lg:basis-1/4 h-[380px] p-1 xs:p-2 lg:p-4" />
			))}
		</div>
	);
};
