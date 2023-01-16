import type { FC } from "react";
import { capitalize } from "../../utils";
import { Feature, ProductColors, ProductSizes } from "./useProduct";
import Image from 'next/image';
import clsx from "clsx";
import { URL_IMG } from "../../content";
import { Icon } from "../Icon";

type Setter = (feature: Feature) => void;
type LatestValue = { color: Feature | undefined, size: Feature | undefined; };

interface Props {
	colors: ProductColors[];
	setColor: Setter;
	sizes: ProductSizes[];
	setSize: Setter;
	values: React.MutableRefObject<LatestValue>;
}

export const ProductVariations: FC<Props> = ({ colors, setColor, sizes, setSize, values }) => {
	const { color, size } = values.current;
	return (
		<>
			<div className="mb-2">
				<span className="uppercase text-dark/60">Color:</span>
				<span className="ml-2 font-semibold">{color ? capitalize(color.name) : 'All'}</span>
			</div>
			<div className="flex flex-wrap space-x-4">
				{colors.map(({ id, name, image }) => (
					<button
						key={id}
						onClick={() => setColor({ id, name })}
						className={clsx("w-16 h-16 border-2 border-transparent", {
							['border-dark']: color?.id === id
						})}
					>
						<Image
							src={URL_IMG + image}
							alt={name}
							width={64}
							height={64}
							className="object-cover w-full h-full" />
					</button>
				))}
			</div>

			<div className="mb-2 mt-7">
				<span className="uppercase text-dark/60">Size:</span>
				<span className="ml-2 font-semibold">{size ? capitalize(size.name) : 'All'}</span>
			</div>
			<div className="flex flex-wrap space-x-4">
				{sizes.map(({ id, name }) => (
					<button
						key={id}
						onClick={() => setSize({ id, name })}
						className={clsx('bg-grey-100 pt-2 pb-1 px-3 text-dark/80 border-2 border-transparent', {
							['border-dark']: size?.id === id
						})}
					>
						{name}
					</button>
				))}
			</div>

			<button className="text-dark/60 mt-3">
				<Icon name="clothes-hanger" size={20} className="-mt-1 mr-2" />
				Size guide
			</button>
		</>
	);
};
