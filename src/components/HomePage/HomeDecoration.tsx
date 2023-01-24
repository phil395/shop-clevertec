import type { FC } from "react";
import Image from "next/image";


interface Props {

}

const DECORATIONS = [
	{
		url: '/HomePage/home-decoration-1.jpg',
		alt: 'home decoration 1',
		title: [{ text: 'lookbook collection', accent: false }],
		subtitle: 'New Season'
	},
	{
		url: '/HomePage/home-decoration-2.jpg',
		alt: 'home decoration 2',
		title: [{ text: 'Get UP to', accent: false }, { text: '50% off', accent: true }],
		subtitle: 'Sale'
	},
];

export const HomeDecoration: FC<Props> = () => {
	return (
		<div className="flex space-x-8 py-24">
			{DECORATIONS.map(({ url, alt, title, subtitle }, index) => {
				const titleParts = title.map(
					({ text, accent }, index) => accent ? (
						<span key={index} className="text-pink"> {text} </span>
					) : text
				);
				return (
					<figure key={index} className="relative">
						<Image src={url}
							alt={alt}
							width={540}
							height={260}
							className="object-cover w-full h-full"
						/>
						<figcaption className="pt-2 pb-1 px-7 absolute-center uppercase font-semibold bg-white">
							<div className="text-sm text-dark/60">{subtitle}</div>
							<div>{titleParts}</div>
						</figcaption>
					</figure>
				);
			})}
		</div>
	);
};
