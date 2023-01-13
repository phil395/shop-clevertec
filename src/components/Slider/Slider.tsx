import clsx from "clsx";
import { FC, useMemo } from "react";
import { useSlider } from "../../hooks";
import { shuffle } from "../../utils";
import { trpc } from "../../utils/trpc";
import { Icon } from "../Icon";
import { ProductCard } from "../ProductCard";

interface Props {
	type: 'small' | 'regular',
	className?: string;
	heading: string;
	excludeSku?: number;
	catalog: { name: string, slug: string; };
}

export const Slider: FC<Props> = ({ type, className, heading, excludeSku, catalog }) => {
	const { elementsRef, nextSlide, prevSlide } = useSlider();
	const { data } = trpc.products.list.useQuery({ category: catalog.name, limit: 10 });
	const items = useMemo(() => shuffle(data?.products), [data]);

	if (!items) return null;

	return (
		<section className={'overflow-hidden ' + className}>
			<div className={`flex items-center ${type === 'regular' ? 'mb-5' : 'mb-3'} -mt-2`}>

				<h3 className={`uppercase text-dark font-semibold flex-grow ${type === 'regular' ? 'text-xl' : null}`}>{heading}</h3>

				<button
					onClick={prevSlide}
					className="p-2 rotate-90"
				>
					<Icon name="arrow" size={20} />
				</button>
				<button
					onClick={nextSlide}
					className="p-2 -rotate-90"
				>
					<Icon name="arrow" size={20} />
				</button>
			</div>

			<div ref={elementsRef} className={clsx('flex space-x-6 overflow-x-scroll overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory', {
				['2xl:space-x-14']: type === 'regular'
			})}>
				{items.map(({ name, priceBase, discount, rating, sku, products }) => {
					if (sku === excludeSku) return null;
					return (
						<ProductCard key={sku}
							imgSize={type}
							url={catalog.slug + '/' + sku}
							img={products[0].images[0].url}
							priceBase={priceBase}
							discount={discount}
							rating={rating}
							title={name}
							className={clsx("flex-0 snap-start", {
								['h-[360px] w-56']: type === 'regular',
								['h-72 w-44']: type === 'small'
							})}
						/>
					);
				})}
			</div>
		</section>
	);
};
