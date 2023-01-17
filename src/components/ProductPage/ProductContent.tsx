import { FC } from "react";
import { ProductSlider } from "./ProductSlider";
import { Divider } from "../Divider";
import { PaymentLogos } from "../PaymentLogos";
import { Slider } from "../Slider/Slider";
import { useProduct } from "./useProduct";
import { ProductVariations } from "./ProductVariations";
import { ProductCTA } from "./ProductCTA";
import { InfoBanner } from "../InfoBanner";
import { ProductInfo } from "./ProductInfo";
import { ProductReviews } from "./ProductReviews";
import { ProductHeader } from "./ProductHeader";

interface Props {
	sku: number;
}

export const ProductContent: FC<Props> = ({ sku }) => {
	const { data, imageUrls } = useProduct(sku);

	if (!data || !imageUrls) return null;

	return (
		<main className="mb-14">
			<ProductHeader {...data.header} available={true} />
			<section className="py-4 md:py-7">
				<div className="container">
					<div className="flex flex-col lg:flex-row lg:space-x-3 xl:space-x-6">
						<ProductSlider imageUrls={imageUrls} className='flex-1 lg:basis-3/5 xl:basis-1/2 overflow-hidden' />

						<div className='mt-6 lg:mt-0 flex-1 lg:basis-2/5 xl:basis-1/2'>
							<ProductVariations
								{...data.variations}
							/>
							<Divider />
							<ProductCTA
								{...data.cta}
							/>
							<Divider />
							<InfoBanner
								type="product-page"
							/>
							<Divider
								heading="guaranteed safe checkout"
							/>
							<PaymentLogos
								className="-mt-3 xl:mt-0 flex justify-center flex-wrap xl:flex-nowrap space-x-2"
								size="regular"
							/>
							<Divider />
							<h2 className="uppercase text-dark/60 font-semibold">Description</h2>
							<Divider />
							<ProductInfo
								{...data.info}
							/>
							<Divider />
							<ProductReviews
								{...data.reviews}
							/>
						</div>
					</div>
					<Slider
						className="mt-8"
						heading="Related Products"
						type="regular"
						excludeSku={data.sku}
						catalog={data.catalog}
					/>
				</div>
			</section>
		</main>
	);
};