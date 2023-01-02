import PRODUCTS from './products.json';
import { PrismaClient } from '@prisma/client';

// type ProductItem = Prisma.ProductCreateNestedManyWithoutProductSkuInput['create'];

const prisma = new PrismaClient();

const fillBase = async () => {
	for (const [categoryName, products] of Object.entries(PRODUCTS)) {

		for (const product of products) {

			const preparedImages = product.images.reduce((acc, value) => {
				const { color, url } = value;
				const existing = acc.find(el => el.color === color);
				if (existing) {
					existing.urls.push(url);
				} else {
					acc.push({ color, urls: [url] });
				}
				return acc;
			}, [] as { color: string; urls: string[]; }[]);

			await prisma.productSku.create({
				data: {
					name: product.name,
					category: {
						connectOrCreate: {
							where: {
								name: categoryName
							},
							create: {
								name: categoryName,
								slug: '/' + categoryName
							}
						}
					},
					brand: {
						connectOrCreate: {
							where: {
								name: product.brand
							},
							create: {
								name: product.brand
							}
						}
					},
					material: product.material,
					rating: product.rating,
					priceBase: product.price,
					discount: product.discount ? Math.abs(parseInt(product.discount)) : 0,
					reviews: {
						create: product.reviews.map(review => ({
							author: review.name,
							content: review.text,
							rating: review.rating
						}))
					},
					products: {
						create: product.sizes.flatMap(size => preparedImages.map(image => ({
							rest: Math.trunc(Math.random() * 10),
							size: {
								connectOrCreate: {
									create: {
										name: size
									},
									where: {
										name: size
									}
								}
							},
							color: {
								connectOrCreate: {
									create: {
										name: image.color
									},
									where: {
										name: image.color
									}
								}
							},
							images: {
								create: image.urls.map(url => ({
									color: {
										connectOrCreate: {
											create: {
												name: image.color
											},
											where: {
												name: image.color
											}
										}
									},
									url
								}))
							}
						})))
					},

					isBestseller: product.particulars.isBestseller,
					isFeatured: product.particulars.isFeatured,
					isMostViewed: product.particulars.isMostViewed,
					isNewArrivals: product.particulars.isNewArrivals
				}
			});
		}
	}
};

const removeAll = async () => {
	await prisma.productSku.deleteMany({
		where: {
			sku: {
				lt: 1000
			}
		}
	});
};

fillBase()
	// removeAll()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});