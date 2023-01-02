import type { FC } from "react";

interface Props {
	className?: string;
}

export const ProductCard: FC<Props> = ({ className }) => {
	return (
		<figure className={className}>
			<div className="h-48 bg-dark"></div>
			<figcaption className="mt-2 text-dark/80 truncate">Test product card est product card</figcaption>
			<div className="font-semibold text-dark">$ 40</div>
		</figure>
	);
};
