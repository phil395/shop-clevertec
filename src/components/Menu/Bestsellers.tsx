import { FC, useRef } from "react";
import { Icon } from "../Icon";
import { ProductCard } from "../ProductCard";

interface Props {
	catalogTitle: string;
}

export const Bestsellers: FC<Props> = ({ catalogTitle }) => {
	const slider = useRef<HTMLDivElement>(null);

	const nextSlide = () => {
		/* slide Size + gap Size */
		slider.current?.scrollBy(488 + 28, 0);
	};
	const prevSlide = () => {
		slider.current?.scrollBy(-488 - 28, 0);
	};

	return (
		<section>
			<div className="flex items-center mb-3 -mt-2">
				<h3 className="uppercase font-semibold flex-grow">Bestsellers</h3>
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
			<div ref={slider} className="w-[488px] flex gap-7 scroll-smooth overflow-x-auto scrollbar-mod snap-x">

				{Array.from({ length: 10 }, (_, i) => {
					return <ProductCard key={i} className="w-36 flex-shrink-0 snap-center" />;
				})}

			</div>
		</section>
	);
};