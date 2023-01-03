import type { FC } from "react";
import { trpc } from "../../utils/trpc";

interface Props {
	sku: number;
}

export const ProductContent: FC<Props> = ({ sku }) => {
	const { data } = trpc.products.bySku.useQuery(sku, {
		// from cache
		select: (data) => {
			if (!data) return;
			return {
				sku: data.sku,
				name: data.name,
				rating: data.rating,
				reviews: data.reviews,
				products: data.products
			};
		}
	});

	if (!data) return null;

	return (
		<section>
			Hello from ProductContent
			<pre>
				{JSON.stringify(data, null, 2)}
			</pre>
		</section>
	);
};