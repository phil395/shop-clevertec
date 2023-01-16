import { IconName } from "../components/Icon";

export interface Address {
	name: 'phone' | 'location' | 'workingTimes' | 'email',
	text: string,
	href?: string,
	iconFill: IconName;
	icon: IconName;
}

export const ADDRESS: Address[] = [
	{
		name: 'phone',
		text: '+375 29 100 20 30',
		href: "tel:+375291002030",
		iconFill: 'phone-fill',
		icon: 'phone'
	},
	{
		name: 'location',
		text: 'Belarus, Gomel, Lange 17',
		href: "https://yandex.by/maps/-/CCUrBRhy9A",
		iconFill: 'location-fill',
		icon: 'location'
	},
	{
		name: 'workingTimes',
		text: 'All week 24/7',
		iconFill: 'clock-fill',
		icon: 'clock'
	},
	{
		name: 'email',
		text: 'info@clevertec.ru',
		href: 'mailto:info@clevertec.ru',
		iconFill: 'mail',
		icon: 'mail'
	}
];