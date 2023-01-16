import type { FC } from "react";
import { ProductColors, ProductSizes } from "./useProduct";

interface Props {
	colors: ProductColors[];
	sizes: ProductSizes[];
	material: string;
}

export const ProductInfo: FC<Props> = ({ colors, sizes, material }) => {
	return (
		<>
			<h2 className="mb-6 uppercase text-dark font-semibold">Additional information</h2>
			<div className="my-2">
				<span className="text-dark mr-1">Color: </span>
				<span className="text-dark/60">{colors.map(({ name }) => name).join(', ')}</span>
			</div>
			<div className="my-2">
				<span className="text-dark mr-1">Sizes: </span>
				<span className="text-dark/60">{sizes.map(({ name }) => name).join(', ')}</span>
			</div>
			<div className="my-2">
				<span className="text-dark mr-1">Material: </span>
				<span className="text-dark/60">{material}</span>
			</div>
		</>
	);
};
