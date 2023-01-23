import type { FC } from "react";
import Image from "next/image";
import { Rating } from "../Rating";
import { URL_IMG } from "../../content";
import Link from "next/link";

export interface IProductCard {
	imgSize: 'small' | 'regular';
	img: string,
	url: string;
	title: string,
	priceBase: number,
	discount: number;
	rating: number;
}

interface Props extends IProductCard {
	className?: string;
}

export const ProductCard: FC<Props> = ({ imgSize, className, url, img, title, priceBase: priceBase, discount, rating }) => {
	return (
		<Link href={url} className={'flex flex-col flex-nowrap ' + className} title={title} >
			<Image
				src={URL_IMG + img}
				alt={title}
				width={imgSize === 'small' ? 160 : 255}
				height={imgSize === 'small' ? 199 : 318}
				className="object-cover w-full flex-1 overflow-hidden"
			/>

			<h4 className="mt-2 flex-0 text-dark/60 truncate">{title}</h4>

			<div className="flex-0 flex items-end">
				{discount ? (
					<span className="flex-1 flex flex-wrap">
						<span className="mr-2 font-semibold text-lg text-dark leading-none">$&nbsp;{(priceBase * discount / 100).toFixed(2)}</span>
						<del className="mt-1 font-semibold text-dark/40 leading-none">$&nbsp;{priceBase}</del>
					</span>
				) : (
					<span className="font-semibold text-lg text-dark leading-none flex-1">$&nbsp;{priceBase}</span>
				)}
				{imgSize === 'regular' ? <Rating size="small" value={rating} /> : null}
			</div>
		</Link>
	);
};
