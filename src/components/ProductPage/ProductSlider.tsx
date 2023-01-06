import { FC, memo, useEffect, useId, useReducer, useRef, useState } from "react";
import { SliderBtn } from "../Slider";
import type { Image as ImageType } from '@prisma/client';
import Image from "next/image";
import { URL_IMG } from "../../content";
import { useSlider } from "../../hooks";


interface Props {
	className: string;
	images: ImageType[];
}

export const ProductSlider: FC<Props> = ({ className, images }) => {

	const { initializeElements, initializePreviews, nextSlide, prevSlide, selectElement, subscribeOnFirst, subscribeOnLast } = useSlider();

	return (
		<figure className={className}>

			<div className="flex space-x-5">
				<div className="">
					<div className="flex justify-between">
						<SliderBtn
							onClick={() => {
								prevSlide();
							}}
							subscribe={subscribeOnFirst}
							size={20}
							className="p-2"
						/>
						<SliderBtn
							onClick={() => {
								nextSlide();
							}}
							subscribe={subscribeOnLast}
							size={20}
							className="rotate-180 p-2"
						/>
					</div>

					<div ref={initializePreviews} className="h-[520px] flex flex-col space-y-7 scroll-smooth overflow-y-auto scrollbar-hide snap-y snap-mandatory">
						{images.map((img, index) => (
							<button
								key={img.id}
								className='h-28 w-[72px] snap-always snap-start flex-0'
								onClick={() => selectElement(index)}
							>
								<Image
									src={URL_IMG + img.url}
									alt="product image"
									className='object-cover w-full h-full'
									width={96}
									height={112}
								/>
							</button>
						))}
					</div>
				</div>

				<div ref={initializeElements} className="flex-grow flex scroll-smooth overflow-x-auto snap-x snap-mandatory scrollbar-hide bg-grey-100">
					{images.map((img) => (
						<Image
							key={img.id}
							src={URL_IMG + img.url}
							alt="product image"
							className="object-cover flex-0 snap-always snap-start"
							width={380}
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
