import type { FC } from "react";
import { BreadcrumbItem, Breadcrumb } from "../Breadcrumb";
import { Icon } from "../Icon";
import { Rating } from "../Rating";

interface Props {
	sku: number;
	name: string;
	breadcrumbPath: BreadcrumbItem[];
	rating: number;
	reviewCount: number;
	available: boolean;
}

export const ProductHeader: FC<Props> = ({ sku, name, breadcrumbPath, rating, reviewCount, available }) => {
	// const { data } = trpc.products.bySku.useQuery(sku, {
	// 	// from cache
	// 	select: (data) => {
	// 		if (!data) return;
	// 		const path = [
	// 			{ name: 'home', url: '/' },
	// 			{ name: data.category.name, url: data.category.slug },
	// 			{ name: data.name }
	// 		] as BreadcrumbItem[];
	// 		return {
	// 			path,
	// 			name: data.name,
	// 			rating: data.rating,
	// 			reviewCount: data.reviews.length,
	// 			sku: data.sku,
	// 			available: data.products.some(product => product.rest > 0)
	// 		};
	// 	}
	// });

	// if (!data) return null;

	return (
		<section className="bg-grey-100 py-3">
			<div className="container">
				<div className="flex justify-between items-center space-x-2">
					<Breadcrumb path={breadcrumbPath} />
					<button className="text-dark/60 whitespace-nowrap text-center">
						<Icon name="share" size={20} className='-mt-1 mr-1' />
						<span>Share</span>
					</button>
				</div>

				<h1 className="my-3 text-2xl font-semibold text-center text-dark">{name}</h1>

				<div className="flex items-center flex-col-reverse sm:flex-row sm:space-x-4 text-sm">
					<span className="flex-grow flex items-center space-x-2 text-dark/60">
						<Rating value={rating} size="small" className="-mt-1" />
						<span>{reviewCount} Reviews</span>
					</span>

					<span>
						<span className="text-dark/60">SKU:</span>
						<span className="pl-1 font-semibold">{sku}</span>
					</span>

					<span>
						<span className="text-dark/60">Availability:</span>
						<span className="pl-1 font-semibold">{available ? 'In Stock' : 'Out Of Stock'}</span>
					</span>
				</div>
			</div>
		</section>
	);
};