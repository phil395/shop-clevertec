import type { FC } from "react";
import { trpc } from "../../utils/trpc";

interface Props {
	sku: number;
}

export const ProductHeader: FC<Props> = ({ sku }) => {
	const { data } = trpc.products.bySku.useQuery(sku, {
		// from cache
		select: (data) => {
			if (!data) return;
			return {
				path: ['home', data.category.name, data.name],
				name: data.name,
				rating: data.rating,
				reviewCount: data.reviews.length,
				sku: data.sku,
				availability: data.products.some(product => product.rest > 0)
			};
		}
	});

	if (!data) return null;

	return (
		<section>
			Hello from ProductHeader
			<pre>
				{JSON.stringify(data, null, 2)}
			</pre>
		</section>
	);
};