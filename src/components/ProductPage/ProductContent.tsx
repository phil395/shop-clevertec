import { Prisma } from "@prisma/client";
import { FC, useState } from "react";
import { trpc } from "../../utils/trpc";
import { ProductSlider } from "./ProductSlider";

interface Props {
	sku: number;
}

export const ProductContent: FC<Props> = ({ sku }) => {
	const { data } = trpc.products.bySku.useQuery(sku, {
		// from cache
		select: (data) => {
			if (!data) return;
			return {
				sku: data.sku,
				name: data.name,
				rating: data.rating,
				reviews: data.reviews,
				products: data.products
			};
		}
	});

	const [colorId, setColorId] = useState<number>();
	const [sizeId, setSizeId] = useState<number>();

	// console.dir(data);

	if (!data) return null;

	const images = data.products.flatMap(product => {
		const isCorrectColor = colorId && product.colorId === colorId;
		const isCorrectSize = sizeId && product.sizeId === sizeId;

		const addImages = () => product.images.map(img => img);

		if (!colorId && !sizeId) return addImages();
		if (isCorrectColor && isCorrectSize) return addImages();
		if (!colorId && isCorrectSize) return addImages();
		if (isCorrectColor && !sizeId) return addImages();

		return []; // not add
	});



	return (
		<section className="md:py-7">
			<div className="container">
				<div className="flex space-x-6">
					<ProductSlider images={images} className='flex-1 basis-1/2' />
					<div className='flex-1 basis-1/2'>dsds</div>
				</div>
			</div>
		</section>
	);
};