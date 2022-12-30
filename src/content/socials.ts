import { IconName } from "../components/Icon";

interface Social {
	name: string,
	icon: IconName,
	href: string;
}

export const SOCIALS: Social[] = [
	{ name: 'facebook', icon: 'logo-facebook', href: 'https://clevertec.ru/' },
	{ name: 'twitter', icon: 'logo-twitter', href: 'https://clevertec.ru/' },
	{ name: 'instagram', icon: 'logo-instagram', href: 'https://clevertec.ru/' },
	{ name: 'pinterest', icon: 'logo-pinterest', href: 'https://clevertec.ru/' },
];