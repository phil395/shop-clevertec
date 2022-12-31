import { FC } from "react";
import { MENU } from "../../content";
import { useMatchMedia } from "../../hooks";
import { Portal } from "../Portal";
import { MenuMobile } from "./MenuMobile";

interface Props {
	menuPortalRef: React.RefObject<HTMLDivElement>;
}


export const Menu: FC<Props> = ({ menuPortalRef }) => {
	const { xl } = useMatchMedia();

	const onPointerEnter: React.PointerEventHandler<HTMLAnchorElement> = (e) => {
		console.log('caught');
	};

	if (xl) return (
		<>
			<ul className="flex space-x-8 xl:mt-2">
				{MENU.map(({ title, link, catalog }, index) => (
					<li key={index}>
						<a
							href={link}
							onPointerEnter={catalog ? onPointerEnter : undefined}
						>
							{title}
						</a>
					</li>
				))}
			</ul>

			<Portal portalRef={menuPortalRef}>
				<div className="text-yellow text-2xl text-center">
					Hello from desktop Menu portal
				</div>
			</Portal>
		</>
	);

	// if (xs, sm, md, lg)
	return <MenuMobile menuPortalRef={menuPortalRef} />;
};
