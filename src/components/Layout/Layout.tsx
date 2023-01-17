import { FC, PropsWithChildren, useRef } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";

interface Props {

}

export const Layout: FC<PropsWithChildren<Props>> = ({ children }) => {
	const topPortalRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<div id="top-portal" ref={topPortalRef}></div>
			<Header topPortalRef={topPortalRef} />
			{children}
			<Footer />
		</>
	);
};