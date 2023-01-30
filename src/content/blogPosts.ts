export interface IBlogPost {
	id: number,
	title: string,
	date: string,
	img: string,
	summary: string,
	text: string,
}

export const BLOG_POSTS = {
	lastId: 3,
	posts: [
		{
			id: 1,
			title: 'The Easiest Way to Break',
			date: 'April 6, 2022',
			img: '/blog-posts/post_1.jpg',
			summary: 'But I must explain to you how all this mistaken idea of denouncing pleas and praising pain was bor',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, repellendus maiores similique blanditiis placeat error hic expedita earum? Fugiat ab asperiores maiores porro harum assumenda nulla nihil dignissimos natus dicta.'
		},
		{
			id: 2,
			title: 'Wedding Season',
			date: 'April 6, 2022',
			img: '/blog-posts/post_2.jpg',
			summary: 'But I must explain to you how all this mistaken idea of denouncing pleas and praising pain was bor',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, repellendus maiores similique blanditiis placeat error hic expedita earum? Fugiat ab asperiores maiores porro harum assumenda nulla nihil dignissimos natus dicta.'
		},
		{
			id: 3,
			title: 'Recent Favorites On Repeat',
			date: 'April 6, 2022',
			img: '/blog-posts/post_3.jpg',
			summary: 'But I must explain to you how all this mistaken idea of denouncing pleas and praising pain was bor',
			text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, repellendus maiores similique blanditiis placeat error hic expedita earum? Fugiat ab asperiores maiores porro harum assumenda nulla nihil dignissimos natus dicta.'
		}
	]
};