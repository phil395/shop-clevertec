import { FC } from "react";
import { MENU } from "../../content";
import { useMatchMedia } from "../../hooks";
import { Hamburger } from "./Hamburger";

interface MenuMobileProps {
	setModal: React.Dispatch<MenuMobileType>;
	isActive: boolean;
}

export type MenuMobileType = {
	name: 'menu',
	Component: typeof List;
};

const List: FC<{}> = () => {
	return <ul className="flex flex-row space-y-5 text-dark">
		{MENU.map(({ title, link }, index) => (
			<li key={index}>
				<a href={link}>{title}</a>
			</li>
		))}
	</ul>;
};


export const MenuMobile: FC<MenuMobileProps> = ({ setModal, isActive }) => {
	const { xs, sm, md, lg, xl } = useMatchMedia();

	if (xl) return null;
	const modal: MenuMobileType = { name: 'menu', Component: List };
	const onClick = () => setModal(modal);

	if (md || lg) {
		return (
			<button
				onClick={onClick}
				className='mr-8 pt-1 px-3 text-lg text-dark border-2 rounded-lg uppercase tracking-wide font-medium '
			>
				Catalog
			</button>
		);
	}

	if (xs || sm) {
		return <Hamburger onClick={onClick} isActive={isActive} />;
	}

	return null;
};