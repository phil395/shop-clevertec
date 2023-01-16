import type { FC } from "react";
import { Icon } from "../Icon";
import { Rating } from "../Rating";

interface IReview {
	id: number;
	author: string;
	content: string;
	rating: number;
}

interface Props {
	rating: number;
	reviews: IReview[];
}

export const ProductReviews: FC<Props> = ({ rating, reviews }) => {
	return (
		<>
			<h2 className="mb-6 uppercase text-dark font-semibold">Reviews</h2>
			<div className="mb-6 flex justify-between items-center space-x-4 text-dark/60">
				<span className="flex-grow flex flex-wrap items-center space-x-2">
					<Rating value={rating} size="small" className="-mt-1" />
					<span className="whitespace-nowrap">{reviews.length} Reviews</span>
				</span>
				<button className="whitespace-nowrap">
					<Icon name='mail' size={20} className='-mt-1 mr-2' />
					Write a review
				</button>
			</div>

			{reviews.map(({ id, author, content, rating }) => (
				<article key={id} className="mb-6">
					<div className="mb-3 flex justify-between space-x-3">
						<h6 className="w-52 truncate text-dark">{author}</h6>
						<Rating value={rating} size='small' />
					</div>
					<p className="text-dark/60 text-sm">{content}</p>
				</article>
			))}
		</>
	);
};
