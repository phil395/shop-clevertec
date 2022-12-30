import { Localization } from "../Localization";
import { Search } from "../Search";

export const modals = [
	{ name: 'search', navbarIcon: 'search', Component: Search },
	{ name: 'localization', navbarIcon: 'globe', Component: Localization },
	{ name: 'account', navbarIcon: 'user', Component: Localization },
	{ name: 'cart', navbarIcon: 'shopping-bag', Component: Localization },
	/* { name: 'menu', Component: List from (MenuMobile) }  >> see MenuMobile */
] as const;

