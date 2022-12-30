import { FC } from "react";
import { MENU } from "../../content";
import { useMatchMedia } from "../../hooks";
import { Portal } from "../Portal";

interface Props {
	menuPortalRef: React.RefObject<HTMLDivElement>;
}


export const Menu: FC<Props> = ({ menuPortalRef }) => {
	const { xl } = useMatchMedia();

	if (!xl) return null;

	return (
		<>
			<ul className="flex space-x-8 xl:mt-2">
				{MENU.map(({ title, link, catalog }, index) => {
					const onPointerEnter: React.PointerEventHandler<HTMLAnchorElement> = (e) => {

					};
					return (
						<li key={index}>
							<a
								href={link}
								onPointerEnter={catalog ? onPointerEnter : undefined}
							>
								{title}
							</a>
						</li>
					);
				})}
			</ul>

			<Portal portalRef={menuPortalRef}>
				Hello world from portal
			</Portal>
		</>
	);
};
