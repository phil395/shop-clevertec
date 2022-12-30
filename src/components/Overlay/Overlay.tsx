import { FC, PropsWithChildren, useEffect, useRef } from "react";

interface Props {
	onModalClose: () => void;
}

export const Overlay: FC<PropsWithChildren<Props>> = ({ children, onModalClose }) => {

	const overlayRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const node = overlayRef.current;
		if (!node) return;
		const clickHandler = (e: MouseEvent) => {
			onModalClose();
		};
		const keyHandler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onModalClose();
			}
		};

		node.addEventListener('click', clickHandler, { once: true });
		window.addEventListener('keydown', keyHandler, { once: true });

		return () => {
			node.removeEventListener('click', clickHandler);
			window.removeEventListener('keydown', keyHandler);
		};
	}, []);

	return (
		<div ref={overlayRef} className="absolute inset-0 bg-dark bg-opacity-60">
			{children}
		</div>
	);
};
