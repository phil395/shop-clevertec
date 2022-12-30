import { IconName } from "../components/Icon";

export interface Address {
	name: 'phone' | 'location' | 'workingTimes' | 'email',
	text: string,
	href?: string,
	icon: IconName;
}

export const ADDRESS: Address[] = [
	{
		name: 'phone',
		text: '+375 29 100 20 30',
		href: "tel:+375291002030",
		icon: 'phone-fill'
	},
	{
		name: 'location',
		text: 'Belarus, Gomel, Lange 17',
		href: "https://yandex.by/maps/-/CCUrBRhy9A",
		icon: 'location-fill'
	},
	{
		name: 'workingTimes',
		text: 'All week 24/7',
		icon: 'clock-fill'
	},
	{
		name: 'email',
		text: 'info@clevertec.ru',
		href: 'info@clevertec.ru',
		icon: 'mail'
	}
];