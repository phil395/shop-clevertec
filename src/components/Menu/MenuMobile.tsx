import { FC, useState } from "react";
import { MENU } from "../../content";
import { ScreenState, useMatchMedia } from "../../hooks";
import { Portal } from "../Portal";
import { Hamburger } from "./Hamburger";

interface Props {
	menuPortalRef: React.RefObject<HTMLDivElement>;
}

const List: FC<{}> = () => {
	return <ul className="flex flex-row space-y-5 text-dark">
		{MENU.map(({ title, link }, index) => (
			<li key={index}>
				<a href={link}>{title}</a>
			</li>
		))}
	</ul>;
};

type ButtonProp = { onClick: Parameters<typeof Hamburger>[0]['onClick']; };

const Button: FC<ButtonProp> = ({ onClick }) => {
	return (
		<button
			onClick={onClick}
			className='mr-8 pt-1 px-3 text-lg text-dark border-2 rounded-lg uppercase tracking-wide font-medium '
		>
			Catalog
		</button>
	);
};

const getCta = (onClick: ButtonProp['onClick'], isActive: boolean, screenSizes: ScreenState) => {
	const { xs, sm, md, lg } = screenSizes;
	if (md || lg) return <Button onClick={onClick} />;
	if (xs || sm) return <Hamburger onClick={onClick} isActive={isActive} />;
	throw new Error('Incorrect screen size value. Check MenuMobile component and useMatchMedia hook');
};


export const MenuMobile: FC<Props> = ({ menuPortalRef }) => {
	const screenSizes = useMatchMedia();
	const [isActive, setIsActive] = useState(false);

	const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		setIsActive(v => !v);
	};

	return (
		<>
			{getCta(onClick, isActive, screenSizes)}

			{isActive ? (
				<Portal portalRef={menuPortalRef}>
					<div className="text-green text-2xl text-center">
						Mobile menu portal
					</div>
				</Portal>
			) : null}
		</>
	);
};