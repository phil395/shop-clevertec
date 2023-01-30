import type { FC } from "react";
import Image from "next/image";

import { IBlogPost, BLOG_POSTS } from "../../content";

interface ArticleProps extends Omit<IBlogPost, 'text'> { }

const Article: FC<ArticleProps> = ({ id, img, title, summary, date }) => {
	return (
		<article className="p-4 group relative">
			<Image src={img} width={350} height={280} alt={title} className="object-cover w-full h-72" />
			<div className="py-5 px-4 w-10/12 absolute left-1/2 -translate-x-1/2 -bottom-16 bg-white">
				<h4 className="mb-2 uppercase text-center text-dark font-semibold">{title}</h4>
				<p className="text-dark/80">{summary}</p>
				<div className="mt-2 hidden group-hover:flex text-sm">
					<span className="flex-1 text-dark/60">{date}</span>
					<button className="uppercase font-semibold">Read more</button>
				</div>
			</div>
		</article>
	);
};

interface BlogProps { }

export const Blog: FC<BlogProps> = () => {
	return (
		<section className="my-24">
			<div className="mb-4 flex uppercase">
				<h2 className="flex-1 text-2xl font-semibold text-dark">Latest from blog</h2>
				<button className="text-dark/60 text-lg uppercase">See All</button>
			</div>
			<div className="-mx-4 flex">
				{BLOG_POSTS.posts.map(({ text, ...props }) => (
					<Article key={props.id} {...props} />
				))}
			</div>
		</section>
	);
};
