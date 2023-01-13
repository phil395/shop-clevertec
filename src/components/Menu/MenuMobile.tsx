import { FC, useState } from "react";
import { MENU } from "../../content";
import { ScreenState, useMatchMedia } from "../../hooks";
import { Portal } from "../Portal";
import { Slider } from "../Slider/Slider";
import { Hamburger } from "./Hamburger";

interface Props {
	menuPortalRef: React.RefObject<HTMLDivElement>;
}

const DEFAULT_CATALOG = { name: MENU[1].title.toLowerCase(), slug: MENU[1].link };

const List: FC<{}> = () => {
	return <ul className="flex flex-col text-dark flex-grow flex-shrink-0 basis-60">
		{MENU.map(({ title, link }, index) => (
			<li key={index}>
				<a href={link} className="my-1 py-2 block text-xl text-center hover:font-semibold transition-all">{title}</a>
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
					<div className="py-4 container flex">
						<List />
						<Slider catalog={DEFAULT_CATALOG} type="small" heading="Bestsellers" className="mt-4 max-w-[576px] max-sm:hidden" />
					</div>
				</Portal>
			) : null}
		</>
	);
};