export interface Menu {
	title: string;
	link: string;
	catalog?: {
		group: string;
		links: { name: string; href: string; }[];
	}[];
}

export const MENU: Menu[] = [
	{
		title: 'About Us',
		link: '#'
	},
	{
		title: 'Women',
		link: '/women',
		catalog: [
			{
				group: 'tops',
				links: [
					{ name: 'Awesome', href: '/women' },
					{ name: 'Beachwear', href: '/women' },
					{ name: 'Beige', href: '/women' },
					{ name: 'Cool', href: '/women' },
					{ name: 'New Dress', href: '/women' },
					{ name: 'Gap', href: '/women' },
					{ name: 'Guess', href: '/women' },
				]
			},
			{
				group: 'bottoms',
				links: [
					{ name: 'Jeans', href: '/women' },
					{ name: 'Lacoste', href: '/women' },
					{ name: 'Levi\'s', href: '/women' },
					{ name: 'Model', href: '/women' },
					{ name: 'Nice Featured', href: '/women' },
					{ name: 'Polo', href: '/women' },
					{ name: 'Pullover', href: '/women' },
				]
			},
			{
				group: 'accessories',
				links: [
					{ name: 'Scarf Sale 13%', href: '/women' },
					{ name: 'Shirt', href: '/women' },
					{ name: 'Shoes', href: '/women' },
					{ name: 'Shorts', href: '/women' },
					{ name: 'Summer', href: '/women' },
					{ name: 'Sunglasses', href: '/women' },
					{ name: 'Vintage', href: '/women' },
				]
			},
		]
	},
	{
		title: 'Men',
		link: '/men',
		catalog: [
			{
				group: 'tops',
				links: [
					{ name: 'Awesome', href: '/men' },
					{ name: 'Beachwear', href: '/men' },
					{ name: 'Beige', href: '/men' },
					{ name: 'Cool', href: '/men' },
					{ name: 'New Dress', href: '/men' },
					{ name: 'Gap', href: '/men' },
					{ name: 'Guess', href: '/men' },
				]
			},
			{
				group: 'bottoms',
				links: [
					{ name: 'Jeans', href: '/men' },
					{ name: 'Lacoste', href: '/men' },
					{ name: 'Levi\'s', href: '/men' },
					{ name: 'Model', href: '/men' },
					{ name: 'Nice Featured', href: '/men' },
					{ name: 'Polo', href: '/men' },
					{ name: 'Pullover', href: '/men' },
				]
			},
			{
				group: 'accessories',
				links: [
					{ name: 'Scarf Sale 13%', href: '/men' },
					{ name: 'Shirt', href: '/men' },
					{ name: 'Shoes', href: '/men' },
					{ name: 'Shorts', href: '/men' },
					{ name: 'Summer', href: '/men' },
					{ name: 'Sunglasses', href: '/men' },
					{ name: 'Vintage', href: '/men' },
				]
			},
		]
	},
	{
		title: 'Beauty',
		link: '#',
	},
	{
		title: 'Accessories',
		link: '#',
	},
	{
		title: 'Blog',
		link: '#',
	},
	{
		title: 'Contacts',
		link: '#',
	}
];
