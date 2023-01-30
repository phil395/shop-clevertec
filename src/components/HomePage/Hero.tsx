import type { FC } from "react";
import Image from "next/image";
import { useSlider } from "../../hooks";

interface Props {

}

const SLIDER_IMG = [
	{ url: '/home-page/hero_main.jpg', alt: 'main slide' },
	{ url: '/home-page/hero_main.jpg', alt: 'main slide' },
	{ url: '/home-page/hero_main.jpg', alt: 'main slide' },
];

export const Hero: FC<Props> = () => {
	const { elementsRef } = useSlider();
	return ( // grid-rows-[1fr,1fr,0.5fr,0.5fr]
		<section className="grid gap-3 grid-cols-2 grid-rows-[280px,110px,110px] md:h-[490px] md:grid-cols-3 md:grid-rows-3 xl:grid-cols-4 xl:grid-rows-2">
			<div ref={elementsRef} className="col-span-2 md:row-span-full flex space-x-6 scroll-smooth overflow-x-auto snap-x snap-mandatory scrollbar-hide bg-grey-100">
				{SLIDER_IMG.map((img, index) => (
					<figure className="relative flex-0 snap-always snap-center w-full">
						<Image
							key={index}
							src={img.url}
							alt={img.alt}
							className="object-cover w-full h-full"
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

			<figure className="relative ">
				<Image src="/HomePage/hero_women.jpg"
					alt="women catalog"
					width={255}
					height={200}
					className="object-cover w-full h-full"
				/>
				<figcaption className="pt-2 pb-1 px-7 absolute-center uppercase font-semibold bg-white">Women</figcaption>
			</figure>

			<figure className="relative ">
				<Image src="/HomePage/hero_men.jpg"
					alt="men catalog"
					width={255}
					height={200}
					className="object-cover w-full h-full"
				/>
				<figcaption className="pt-2 pb-1 px-7 absolute-center uppercase font-semibold bg-white">Men</figcaption>
			</figure>

			<figure className="relative max-md:col-span-2 xl:col-span-2">
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
