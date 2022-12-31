import { FC, useState } from "react";
import { MENU } from "../../content";
import { useMatchMedia } from "../../hooks";
import { Portal } from "../Portal";
import { MenuMobile } from "./MenuMobile";
import { MenuDropdown, MenuDropdownProps } from "./MenuDropdown";

interface Props {
	menuPortalRef: React.RefObject<HTMLDivElement>;
}

type Dropdown = MenuDropdownProps['catalog'];
type PointerHandler = React.PointerEventHandler<HTMLLIElement>;

export const Menu: FC<Props> = ({ menuPortalRef }) => {
	const { xl } = useMatchMedia();
	const [dropdown, setDropdown] = useState<Dropdown | null>(null);


	if (xl) return (
		<>
			<ul className="flex xl:mt-2">
				{MENU.map(({ title, link, catalog }, index) => {
					const onPointerEnter: PointerHandler = (e) => {
						if (!catalog) return;
						setDropdown(catalog);
					};
					const onPointerLeave: PointerHandler = () => {
						setDropdown(null);
					};
					return (
						<li
							key={index}
							className='py-3 px-3 first:pl-0 last:pr-0'
							onPointerEnter={catalog ? onPointerEnter : undefined}
							onPointerLeave={catalog ? onPointerLeave : undefined}
						>
							<a href={link}>{title}</a>
						</li>
					);
				})}
			</ul>

			{dropdown && (
				<Portal portalRef={menuPortalRef}>
					<MenuDropdown catalog={dropdown as Dropdown} />
				</Portal>
			)}
		</>
	);

	// if (xs, sm, md, lg)
	return <MenuMobile menuPortalRef={menuPortalRef} />;
};
