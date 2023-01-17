import type { FC } from "react";
import Image from "next/image";
import { useSlider } from "../../hooks";

interface Props {

}

const SLIDER_IMG = [
	{ url: '/HomePage/hero_main.jpg', alt: 'main slide' },
	{ url: '/HomePage/hero_main.jpg', alt: 'main slide' },
	{ url: '/HomePage/hero_main.jpg', alt: 'main slide' },
];

export const Hero: FC<Props> = () => {
	const { elementsRef } = useSlider();
	return (
		<section className="grid grid-cols-4 grid-rows-2 gap-7 h-[490px]">
			<div ref={elementsRef} className="col-span-2 row-span-2 flex space-x-6 scroll-smooth overflow-x-auto snap-x snap-mandatory scrollbar-hide bg-grey-100">
				{SLIDER_IMG.map((img, index) => (
					<figure className="relative flex-0 snap-always snap-start">
						<Image
							key={index}
							src={img.url}
							alt={img.alt}
							className="object-cover w-full"
							width={540}
							height={490}
						/>
						<figcaption className="absolute-center p-5 bg-white font-semibold text-center">
							<div className="uppercase text-dark/40 text-sm">Banner</div>
							<div className="uppercase text-dark text-xl">your Title text </div>
						</figcaption>
					</figure>
				))}
			</div>

			<figure className="relative">
				<Image src="/HomePage/hero_women.jpg"
					alt="women catalog"
					width={255}
					height={200}
					className="object-cover w-full h-full"
				/>
				<figcaption className="pt-2 pb-1 px-7 absolute-center uppercase font-semibold bg-white">Women</figcaption>
			</figure>

			<figure className="relative">
				<Image src="/HomePage/hero_men.jpg"
					alt="men catalog"
					width={255}
					height={200}
					className="object-cover w-full h-full"
				/>
				<figcaption className="pt-2 pb-1 px-7 absolute-center uppercase font-semibold bg-white">Men</figcaption>
			</figure>

			<figure className="relative col-span-2">
				<Image src="/HomePage/hero_accessories.jpg"
					alt="women accessories"
					width={540}
					height={260}
					className="object-cover w-full h-full"
				/>
				<figcaption className="pt-2 pb-1 px-7 absolute-center uppercase font-semibold bg-white">Accessories</figcaption>
			</figure>
		</section>
	);
};
