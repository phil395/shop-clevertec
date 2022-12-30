import { FC, useRef, useState } from "react";
import { useMatchMedia } from "../../hooks";
import { Address } from "../Address";
import { Menu, MenuMobile } from "../Menu";
import { Navbar } from "../Navbar";
import { Socials } from "../Socials";
import { Logo } from "./Logo";

interface Props {
	topPortalRef: React.RefObject<HTMLDivElement>;
}

export const Header: FC<Props> = ({ topPortalRef }) => {
	const menuPortalRef = useRef<HTMLDivElement>(null);

	return (
		<header>
			<section className="bg-dark text-white text-opacity-80">
				<div className="container py-1 flex justify-between items-center">
					<Address type="header" />
					<Socials />
				</div>
			</section>
			<section className="container flex xl:justify-between items-center py-5 text-dark">
				<Logo />
				<Menu menuPortalRef={menuPortalRef} />
				<Navbar
					topPortalRef={topPortalRef}
					renderMenuMobile={(setModal, isActive) => <MenuMobile setModal={setModal} isActive={isActive} />}
				/>
			</section>
			<div id="menu-portal" ref={menuPortalRef}></div>

		</header>
	);
};
