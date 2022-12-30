import { FC, useRef } from "react";
import { Header } from "../Header";

interface Props {

}

export const Layout: FC<Props> = () => {
	const topPortalRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<div id="top-portal" ref={topPortalRef}></div>
			<Header topPortalRef={topPortalRef} />
		</>
	);
};