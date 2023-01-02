import { FC, useRef } from "react";
import { Address } from "../Address";
import { Menu } from "../Menu";
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
			<section className="py-4 md:p-5 xl:py-0 text-dark shadow-sm">
				<div className="container flex xl:justify-between items-center">
					<Logo />
					<Menu menuPortalRef={menuPortalRef} />
					<Navbar topPortalRef={topPortalRef} />
				</div>
			</section>
			<div id="menu-portal" ref={menuPortalRef}></div>

		</header>
	);
};

