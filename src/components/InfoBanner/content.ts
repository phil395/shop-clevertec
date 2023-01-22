import { IconName } from "../Icon";

interface IBanner {
	icon: IconName;
	text: string;
}

interface IHomeBanner extends IBanner {
	title: string;
}

export const PRODUCT_BANNER: IBanner[] = [
	{ icon: 'truck', text: 'Shipping & Delivery' },
	{ icon: 'refresh', text: 'Returns & Exchanges' },
	{ icon: 'mail', text: 'Ask a question' },
];

export const HOME_BANNER: IHomeBanner[] = [
	{ icon: 'truck', title: 'FREE SHIPPING', text: 'On all UA order or order above $100' },
	{ icon: 'refresh', title: '30 DAYS RETURN', text: 'Simply return it within 30 days for an exchange' },
	{ icon: 'mail', title: 'SUPPORT 24/7', text: 'Contact us 24 hours a day, 7 days a week' },
];