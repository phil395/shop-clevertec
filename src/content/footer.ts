import { MENU } from "./menu";


export const FOOTER = [
	{
		title: 'Categories',
		links: [
			{
				name: MENU[1].title,
				link: MENU[1].link
			},
			{
				name: MENU[2].title,
				link: MENU[2].link
			},
			{
				name: MENU[3].title,
				link: MENU[3].link
			},
			{
				name: MENU[4].title,
				link: MENU[4].link
			}
		]
	},
	{
		title: 'Information',
		links: [
			{
				name: 'About Us',
				link: '#'
			},
			{
				name: 'Contact Us',
				link: '#'
			},
			{
				name: 'Blog',
				link: '#'
			},
			{
				name: 'FAQs',
				link: '#'
			}
		]
	},
	{
		title: 'Useful links',
		links: [
			{
				name: 'Terms & Conditions',
				link: '#'
			},
			{
				name: 'Returns & Exchanges',
				link: '#'
			},
			{
				name: 'Shipping & Delivery',
				link: '#'
			},
			{
				name: 'Privacy Policy',
				link: '#'
			}
		]
	},
	{
		title: 'Contact Us',
		links: null // defined in address
	}

];