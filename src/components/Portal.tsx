import type { FC, PropsWithChildren } from "react";
import ReactDom from "react-dom";

interface Props {
	portalRef: React.RefObject<HTMLDivElement>;
}

export const Portal: FC<PropsWithChildren<Props>> = ({ children, portalRef }) => {
	const root = portalRef.current;

	if (!children || !root) return null;

	return ReactDom.createPortal(children, root);
};