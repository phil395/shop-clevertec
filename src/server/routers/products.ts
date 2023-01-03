import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const productsRouter = router({
	list: publicProcedure
		.input(z.object({
			category: z.string(),
			limit: z.number().min(1).max(12).default(6),
			cursor: z.number().nullish()
		}))
		.query(async ({ input, ctx }) => {
			const products = await ctx.prisma.productSku.findMany({
				take: input.limit + 1,
				where: {
					category: {
						name: input.category
					}
				},
				select: {
					sku: true,
					name: true,
					priceBase: true,
					discount: true,
					rating: true,
					products: {
						select: {
							images: true
						}
					}
				},
				cursor: input.cursor ? { sku: input.cursor } : undefined
			});

			let nextCursor: typeof input.cursor | undefined = undefined;
			if (products.length > input.limit) {
				const nextItem = products.pop();
				nextCursor = nextItem!.sku;
			}

			return {
				products,
				nextCursor
			};
		}),
	bySku: publicProcedure
		.input(z.number().min(1))
		.query(async ({ input, ctx }) => {
			return await ctx.prisma.productSku.findUnique({
				where: {
					sku: input
				},
				include: {
					category: true,
					products: {
						include: {
							color: true,
							images: true,
							size: true
						}
					},
					reviews: true
				}
			});
		}),

});