import { useState, useMemo, useEffect, useLayoutEffect } from "react";
import { trpc } from "../../utils/trpc";
import { Image as ImageType } from "@prisma/client";
import { BreadcrumbItem } from "../Breadcrumb";

export type Feature = { name: string, id: number; };
export type ProductColors = Feature & { image: string; };
export type ProductSizes = Feature;


export const useProduct = (sku: number) => {
	const [color, setColor] = useState<Feature>();
	const [size, setSize] = useState<Feature>();

	const { data: response } = trpc.products.bySku.useQuery(sku);

	useEffect(() => {
		setColor(undefined);
		setSize(undefined);
	}, [sku]);

	const data = useMemo(() => {
		if (!response) return;
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

		return {
			sku,
			products,
			catalog,
			header: { sku, name, breadcrumbPath, rating, reviewCount },
			variations: { colors, color, setColor, sizes, size, setSize },
			cta: { discount, priceBase },
			info: { colors, sizes, material },
			reviews: { reviews, rating }
		};

		// return {
		// 	sku,
		// 	name,
		// 	priceBase,
		// 	discount,
		// 	rating,
		// 	reviews,
		// 	products,
		// 	material,
		// 	catalog: { name: category.name, slug: category.slug },
		// 	colors: Object.values(colors),
		// 	sizes: Object.values(sizes),
		// };
	}, [response]);

	const imageUrls = useMemo(() => {
		if (!data) return;
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


	if (data && (color || size)) {
		data.variations.color = color;
		data.variations.size = size;
	}

	return {
		data,
		imageUrls
	};
};