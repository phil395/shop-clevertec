import { useState, useMemo, useEffect, useLayoutEffect, useRef } from "react";
import { trpc } from "../../utils/trpc";
import { Image as ImageType, Product } from "@prisma/client";
import { BreadcrumbItem } from "../Breadcrumb";

export type Feature = { name: string, id: number; };
export type ProductColors = Feature & { image: string; };
export type ProductSizes = Feature;


export const useProduct = (sku: number) => {
	const [color, setColor] = useState<Feature>();
	const [size, setSize] = useState<Feature>();
	const latest = useRef({ color, size });
	const product = useRef<Product>();

	const { data: response } = trpc.products.bySku.useQuery(sku);

	const data = useMemo(() => {
		if (!response) return;
		latest.current.color = undefined;
		latest.current.size = undefined;
		product.current = undefined;
		const { sku, name, category, products, priceBase,
			discount, rating, reviews, material } = response;

		const colorsMap = {} as Record<number, ProductColors>;
		const sizesMap = {} as Record<number, ProductSizes>;
		for (const product of products) {
			colorsMap[product.colorId] = {
				...product.color,
				image: product.images[0].url
			};
			sizesMap[product.sizeId] = {
				id: product.size.id,
				name: product.size.name
			};
		}
		const colors = Object.values(colorsMap);
		const sizes = Object.values(sizesMap);

		const catalog = { name: category.name, slug: category.slug };

		const breadcrumbPath = [
			{ name: 'home', slug: '/' },
			catalog,
			{ name }
		] as BreadcrumbItem[];
		const reviewCount = reviews.length;

		const set = (type: 'color' | 'size') => {
			return (feature: Feature) => {
				if (latest.current[type]?.id === feature.id) return;
				latest.current[type] = feature;
				const setter = type === 'color' ? setColor : setSize;
				setter(feature);
				const { color, size } = latest.current;
				if (!color || !size) return;
				const selectedProduct = products.find(({ colorId, sizeId }) => (
					colorId === color.id && sizeId === size.id
				));
				if (!selectedProduct) return;
				const { id, sku, colorId, sizeId, rest } = selectedProduct;
				product.current = { id, sku, colorId, sizeId, rest };
				// console.log(product.current);
			};
		};

		const available = Boolean(products.some(product => product.rest > 0));

		return {
			sku,
			products,
			catalog,
			header: { sku, name, breadcrumbPath, rating, reviewCount, available },
			variations: {
				colors, setColor: set('color'), sizes, setSize: set('size'), values: latest
			},
			cta: { discount, priceBase },
			info: { colors, sizes, material },
			reviews: { reviews, rating }
		};
	}, [response]);

	const imageUrls = useMemo(() => {
		if (!data) return;
		const { color, size } = latest.current;
		const imgSet = new Set<ImageType['url']>();

		const addImages = (images: ImageType[]) => {
			for (const img of images) {
				imgSet.add(img.url);
			}
		};

		for (const { images, colorId, sizeId } of data.products) {
			const isSelectedColor = colorId === color?.id;
			const isSelectedSize = sizeId === size?.id;

			if (!color && !size) addImages(images);
			if (isSelectedColor && isSelectedSize) addImages(images);

			if (!color && isSelectedSize) addImages(images);
			if (isSelectedColor && !size) addImages(images);
		}

		return Array.from(imgSet);
	}, [color, size, data]);


	if (data && product.current) {
		data.header.available = product.current.rest > 0;
	}

	return {
		data,
		imageUrls
	};
};