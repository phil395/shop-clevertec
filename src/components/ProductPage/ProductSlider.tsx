import { FC, memo, useEffect, useId, useReducer, useRef, useState } from "react";
import { SliderBtn } from "../Slider";
import type { Image as ImageType } from '@prisma/client';
import Image from "next/image";
import { URL_IMG } from "../../content";
import { useSlider } from "../../hooks";


interface Props {
	className: string;
	imageUrls: string[] /* ImageType[] */;
}

export const ProductSlider: FC<Props> = ({ className, imageUrls }) => {

	const { elementsRef, previewsRef, nextSlide, prevSlide, selectElement, subscribeOnFirst, subscribeOnLast } = useSlider();

	return (
		<figure className={className}>

			<div className="flex max-sm:flex-col-reverse sm:space-x-3 xl:space-x-5">
				<div className="max-sm:flex max-sm:mt-4">
					<div className="flex justify-between max-sm:flex-col">
						<SliderBtn
							onClick={() => {
								prevSlide();
							}}
							subscribe={subscribeOnFirst}
							size={20}
							className="rotate-90 sm:rotate-180 p-2"
						/>
						<SliderBtn
							onClick={() => {
								nextSlide();
							}}
							subscribe={subscribeOnLast}
							size={20}
							className="p-2 text-red max-sm:-rotate-90"
						/>
					</div>

					<div ref={previewsRef} className="sm:h-[520px] flex flex-row sm:flex-col max-sm:space-x-4 sm:space-y-7 scroll-smooth overflow-auto scrollbar-hide max-sm:snap-x sm:snap-y snap-mandatory">
						{imageUrls.map((img, index) => (
							<button
								key={index}
								className='h-28 w-[72px] snap-always snap-start flex-0'
								onClick={() => selectElement(index)}
							>
								<Image
									src={URL_IMG + img}
									alt="product image"
									className='object-cover w-full h-full'
									width={96}
									height={112}
								/>
							</button>
						))}
					</div>
				</div>

				<div ref={elementsRef} className="flex-grow flex space-x-6 scroll-smooth overflow-x-auto snap-x snap-mandatory scrollbar-hide bg-grey-100">
					{imageUrls.map((img, index) => (
						<Image
							key={index}
							src={URL_IMG + img}
							alt="product image"
							className="object-cover xl:w-full flex-0 snap-always snap-start"
							width={440}
							height={560}
						/>
					))}
				</div>
			</div>

			<div>

			</div>

		</figure>
	);
};
