import clsx from "clsx";
import { FC, useMemo } from "react";
import { trpc } from "../../utils/trpc";
import { IProductCard } from "../ProductCard";
import { Showcase } from "../Showcase";

interface Props {
	className?: string;
	catalog: 'men' | 'women';
}

const CTA = [
	{ name: 'New Arrivals', key: 'isNewArrivals' },
	{ name: 'Specials', key: 'isSpecial' },
	{ name: 'Bestsellers', key: 'isBestseller' },
	{ name: 'Most viewed', key: 'isMostViewed' },
	{ name: 'Featured products', key: 'isFeatured' },
];

export const HomeShowcase: FC<Props> = ({ className, catalog }) => {
	const { data: response, fetchNextPage } = trpc.products.list.useInfiniteQuery({ category: catalog, limit: 8 }, {
		getNextPageParam: (lastPage, pages) => lastPage.nextCursor
	});

	const data = response?.pages.flatMap<IProductCard>(({ products }) => products.map(
		({ name, products, discount, priceBase, rating, sku }) => ({
			imgSize: 'regular',
			img: products[0].images[0].url,
			discount,
			priceBase,
			rating,
			title: name,
			url: catalog + '/' + sku
		})
	));

	if (!data) return null;

	return (
		<section className={"mt-20  " + className}>
			<div className="flex">
				<h2 className="flex-1 uppercase text-2xl text-dark font-semibold">
					{catalog === 'men' ? 'MEN\'S' : 'WOMEN\'S'}
				</h2>
				{CTA.map(({ key, name }, index) => (
					<button
						key={index}
						onClick={() => key}
						className={clsx("not-last:mr-6 uppercase text-dark/60 tracking-wider", {

						})}
					>
						{name}
					</button>
				))}
			</div>
			<Showcase cards={data} className="mt-4" />
			<button
				className="py-2 mt-4 w-full text-center bg-grey-100 tracking-widest text-dark uppercase"
				onClick={() => fetchNextPage()}
			>
				Show more
			</button>
		</section>
	);
};
