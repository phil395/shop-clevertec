import { Image as ImageType } from "@prisma/client";
import { FC, useMemo, useState } from "react";
import Image from 'next/image';
import { trpc } from "../../utils/trpc";
import { ProductSlider } from "./ProductSlider";
import { URL_IMG } from "../../content";
import { capitalize } from "../../utils";
import clsx from "clsx";
import { Icon } from "../Icon";
import { Divider } from "../Divider";
import { PaymentLogos } from "../PaymentLogos";
import { Rating, RatingValue } from "../Rating";
import { Slider } from "../Slider/Slider";

interface Props {
	sku: number;
}
type Feature = { name: string, id: number; };

export const ProductContent: FC<Props> = ({ sku }) => {
	const { data } = trpc.products.bySku.useQuery(sku);

	const skuData = useMemo(() => {
		if (!data) return;
		const colors = {} as Record<number, Feature & { image: string; }>;
		const sizes = {} as Record<number, Feature>;
		for (const product of data.products) {
			colors[product.colorId] = {
				...product.color,
				image: product.images[0].url
			};
			sizes[product.sizeId] = {
				id: product.size.id,
				name: product.size.name.replace('INT', '')
			};
		}
		return {
			sku: data.sku,
			name: data.name,
			catalog: { name: data.category.name, slug: data.category.slug },
			priceBase: data.priceBase,
			discount: data.discount,
			rating: data.rating as RatingValue,
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

	if (!skuData || !imageUrls) return null;

	return (
		<section className="py-4 md:py-7">
			<div className="container">
				<div className="flex flex-col lg:flex-row lg:space-x-3 xl:space-x-6">
					<ProductSlider imageUrls={imageUrls} className='flex-1 lg:basis-3/5 xl:basis-1/2 overflow-hidden' />

					<div className='mt-6 lg:mt-0 flex-1 lg:basis-2/5 xl:basis-1/2'>
						{/* Product variations (or options)  */}
						<div className="mb-2">
							<span className="uppercase text-dark/60">Color:</span>
							<span className="ml-2 font-semibold">{color ? capitalize(color.name) : 'All'}</span>
						</div>
						<div className="flex flex-wrap space-x-4">
							{skuData.colors.map(({ id, name, image }) => (
								<button
									key={id}
									onClick={() => setColor({ id, name })}
									className={clsx("w-16 h-16 border-2 border-transparent", {
										['border-dark']: color?.id === id
									})}
								>
									<Image
										src={URL_IMG + image}
										alt={name}
										width={64}
										height={64}
										className="object-cover w-full h-full" />
								</button>
							))}
						</div>

						<div className="mb-2 mt-7">
							<span className="uppercase text-dark/60">Size:</span>
							<span className="ml-2 font-semibold">{size ? capitalize(size.name) : 'All'}</span>
						</div>
						<div className="flex flex-wrap space-x-4">
							{skuData.sizes.map(({ id, name }) => (
								<button
									key={id}
									onClick={() => setSize({ id, name })}
									className={clsx('bg-grey-100 pt-2 pb-1 px-3 text-dark/80 border-2 border-transparent', {
										['border-dark']: size?.id === id
									})}
								>
									{name}
								</button>
							))}
						</div>

						<button className="text-dark/60 mt-3">
							<Icon name="clothes-hanger" size={20} className="-mt-1 mr-2" />
							Size guide
						</button>

						<Divider />

						{/* Product CTA */}
						<div className="flex space-x-4 items-center">
							{skuData.discount ? (
								<div className="flex-center flex-col">
									<del className="leading-none">$&nbsp;{skuData.priceBase}</del>
									<span className="text-2xl leading-none font-semibold">$&nbsp;{(skuData.priceBase * skuData.discount / 100).toFixed(2)}</span>
								</div>
							) : (
								<span className="text-xl font-semibold">$&nbsp;{skuData.priceBase}</span>
							)}

							<button className="px-4 py-2 text-sm font-semibold uppercase bg-dark text-white outline-offset-2 whitespace-nowrap">Add To Card</button>

							<Icon name="heart" size={25} />
							<Icon name="scale" size={25} />
						</div>

						<Divider />

						{/* InfoBanner */}
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

						<Divider heading="guaranteed safe checkout" />

						<PaymentLogos className="-mt-3 xl:mt-0 flex justify-center flex-wrap xl:flex-nowrap space-x-2" size="regular" />

						<Divider />

						<h2 className="uppercase text-dark/60 font-semibold">Description</h2>

						<Divider />

						{/* Product Info */}
						<h2 className="mb-6 uppercase text-dark font-semibold">Additional information</h2>
						<div className="my-2">
							<span className="text-dark mr-1">Color: </span>
							<span className="text-dark/60">{skuData.colors.map(({ name }) => name).join(', ')}</span>
						</div>
						<div className="my-2">
							<span className="text-dark mr-1">Sizes: </span>
							<span className="text-dark/60">{skuData.sizes.map(({ name }) => name).join(', ')}</span>
						</div>
						<div className="my-2">
							<span className="text-dark mr-1">Material: </span>
							<span className="text-dark/60">{skuData.material}</span>
						</div>

						<Divider />

						{/* ProductReviews */}
						<h2 className="mb-6 uppercase text-dark font-semibold">Reviews</h2>
						<div className="mb-6 flex justify-between items-center space-x-4 text-dark/60">
							<span className="flex-grow flex flex-wrap items-center space-x-2">
								<Rating value={skuData.rating} size="small" className="-mt-1" />
								<span className="whitespace-nowrap">{skuData.reviews.length} Reviews</span>
							</span>
							<button className="whitespace-nowrap">
								<Icon name='mail' size={20} className='-mt-1 mr-2' />
								Write a review
							</button>
						</div>

						{skuData.reviews.map(({ id, author, content, rating }) => (
							<article key={id} className="mb-6">
								<div className="mb-3 flex justify-between space-x-3">
									<h6 className="w-52 truncate">{author}</h6>
									<Rating value={rating as RatingValue} size='small' />
								</div>
								<p className="text-dark/60 text-sm">{content}</p>
							</article>
						))}
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