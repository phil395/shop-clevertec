import { Listbox } from "@headlessui/react";
import clsx from "clsx";
import { FC, useMemo, useState } from "react";
import { trpc } from "../../utils/trpc";
import { Icon } from "../Icon";
import { IProductCard } from "../ProductCard";
import { Showcase } from "../Showcase";

interface Props {
	className?: string;
	catalog: 'men' | 'women';
}
type Feature = { name: string, key: string; };

const FEATURES: Feature[] = [
	{ name: 'New Arrivals', key: 'isNewArrivals' },
	{ name: 'Specials', key: 'isSpecial' },
	{ name: 'Bestsellers', key: 'isBestseller' },
	{ name: 'Most viewed', key: 'isMostViewed' },
	{ name: 'Featured products', key: 'isFeatured' },
];

export const HomeShowcase: FC<Props> = ({ className, catalog }) => {
	const [selectedFeature, setSelectedFeature] = useState<Feature>(() => FEATURES[0]);
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


				{FEATURES.map((feature, index) => (
					<button
						key={index}
						onClick={() => setSelectedFeature(feature)}
						className={clsx("not-last:mr-6 hidden uppercase text-dark/60 tracking-wider", {
							['text-dark']: feature.key === selectedFeature.key
						})}
					>
						{feature.name}
					</button>
				))}

				<Listbox as={'div'} className="relative" value={selectedFeature} onChange={setSelectedFeature}>
					<Listbox.Button>
						{selectedFeature.name}
						<Icon name="arrow" size={15} className="-mt-1 ml-3 inline-block" />
					</Listbox.Button>
					<Listbox.Options className="absolute right-0 bg-white shadow-md">
						{FEATURES.map((feature, index) => (
							<Listbox.Option
								key={index}
								value={feature}
								className="py-2 px-5 ui-selected:text-dark text-dark/60 hover:bg-grey-100 cursor-pointer whitespace-nowrap"
							>
								{feature.name}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Listbox>

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
