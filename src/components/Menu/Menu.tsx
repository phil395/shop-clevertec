import { FC, useState } from "react";
import { MENU } from "../../content";
import { useMatchMedia } from "../../hooks";
import { Portal } from "../Portal";
import { MenuMobile } from "./MenuMobile";
import { MenuDropdown, MenuDropdownProps } from "./MenuDropdown";
import clsx from "clsx";

import styles from './Menu.module.css';

interface Props {
	menuPortalRef: React.RefObject<HTMLDivElement>;
}

type Dropdown = MenuDropdownProps['dropdown'];

export const Menu: FC<Props> = ({ menuPortalRef }) => {
	const { xl } = useMatchMedia();
	const [dropdown, setDropdown] = useState<Dropdown | null>(null);

	if (xl) return (
		<>
			<ul className="flex xl:mt-2">
				{MENU.map(({ title, link, catalog }, index) => (
					<li
						key={index}
					>
						<a
							className={clsx('py-6 px-3 block relative transition-all', {
								[styles.active]: dropdown?.title === title
							})}
							onPointerEnter={catalog ? () => setDropdown({ title, link, catalog }) : undefined}
							onPointerLeave={catalog ? () => setDropdown(null) : undefined}
							href={link}
						>
							{title}
						</a>
					</li>
				))}
			</ul>

			{dropdown && (
				<Portal portalRef={menuPortalRef}>
					<MenuDropdown
						dropdown={dropdown as Dropdown}
						onPointerEnter={() => setDropdown(dropdown)}
						onPointerLeave={() => setDropdown(null)}
					/>
				</Portal>
			)}
		</>
	);

	// if (xs, sm, md, lg)
	return <MenuMobile menuPortalRef={menuPortalRef} />;
};
