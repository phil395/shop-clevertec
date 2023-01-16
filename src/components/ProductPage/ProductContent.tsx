import { Image as ImageType } from "@prisma/client";
import { FC, useEffect, useMemo, useState } from "react";
import Image from 'next/image';
import { trpc } from "../../utils/trpc";
import { ProductSlider } from "./ProductSlider";
import { URL_IMG } from "../../content";
import { capitalize } from "../../utils";
import clsx from "clsx";
import { Icon } from "../Icon";
import { Divider } from "../Divider";
import { PaymentLogos } from "../PaymentLogos";
import { Rating } from "../Rating";
import { Slider } from "../Slider/Slider";
import { Feature, ProductColors, ProductSizes } from "./useProduct";
import { ProductVariations } from "./ProductVariations";
import { ProductCTA } from "./ProductCTA";
import { InfoBanner } from "../InfoBanner";
import { ProductInfo } from "./ProductInfo";
import { ProductReviews } from "./ProductReviews";

interface Props {
	sku: number;
}

export const ProductContent: FC<Props> = ({ sku }) => {
	const { data } = trpc.products.bySku.useQuery(sku);

	const skuData = useMemo(() => {
		if (!data) return;
		const colors = {} as Record<number, ProductColors>;
		const sizes = {} as Record<number, ProductSizes>;
		for (const product of data.products) {
			colors[product.colorId] = {
				...product.color,
				image: product.images[0].url
			};
			sizes[product.sizeId] = {
				id: product.size.id,
				name: product.size.name
			};
		}
		return {
			sku: data.sku,
			name: data.name,
			catalog: { name: data.category.name, slug: data.category.slug },
			priceBase: data.priceBase,
			discount: data.discount,
			rating: data.rating,
			reviews: data.reviews,
			products: data.products,
			colors: Object.values(colors),
			sizes: Object.values(sizes),
			material: data.material
		};
	}, [data]);

	const [color, setColor] = useState<Feature>();
	const [size, setSize] = useState<Feature>();

	const imageUrls = useMemo(() => {
		if (!skuData) return;
		const imgSet = new Set<ImageType['url']>();

		const addImages = (images: ImageType[]) => {
			for (const img of images) {
				imgSet.add(img.url);
			}
		};

		for (const { images, colorId, sizeId } of skuData.products) {
			const isSelectedColor = colorId === color?.id;
			const isSelectedSize = sizeId === size?.id;

			if (!color && !size) addImages(images);
			if (isSelectedColor && isSelectedSize) addImages(images);

			if (!color && isSelectedSize) addImages(images);
			if (isSelectedColor && !size) addImages(images);
		}

		return Array.from(imgSet);
	}, [color, size, skuData]);

	useEffect(() => {
		setColor(undefined);
		setSize(undefined);
	}, [sku]);

	if (!skuData || !imageUrls) return null;

	const { colors, sizes, discount, priceBase, material, reviews, rating } = skuData;

	return (
		<section className="py-4 md:py-7">
			<div className="container">
				<div className="flex flex-col lg:flex-row lg:space-x-3 xl:space-x-6">
					<ProductSlider imageUrls={imageUrls} className='flex-1 lg:basis-3/5 xl:basis-1/2 overflow-hidden' />

					<div className='mt-6 lg:mt-0 flex-1 lg:basis-2/5 xl:basis-1/2'>
						<ProductVariations
							colors={colors}
							color={color}
							setColor={setColor}
							sizes={sizes}
							size={size}
							setSize={setSize}
						/>
						<Divider />
						<ProductCTA
							discount={discount}
							priceBase={priceBase}
						/>
						<Divider />
						<InfoBanner
							type="product-page"
						/>
						<Divider
							heading="guaranteed safe checkout"
						/>
						<PaymentLogos
							className="-mt-3 xl:mt-0 flex justify-center flex-wrap xl:flex-nowrap space-x-2"
							size="regular"
						/>
						<Divider />
						<h2 className="uppercase text-dark/60 font-semibold">Description</h2>
						<Divider />
						<ProductInfo
							sizes={sizes}
							colors={colors}
							material={material}
						/>
						<Divider />
						<ProductReviews
							reviews={reviews}
							rating={rating}
						/>
					</div>
				</div>
				<Slider
					className="mt-8"
					heading="Related Products"
					type="regular"
					excludeSku={skuData.sku}
					catalog={skuData.catalog}
				/>
			</div>
		</section>
	);
};