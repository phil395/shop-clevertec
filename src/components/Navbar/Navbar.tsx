import { FC, useState } from "react";
import { Icon } from "../Icon";
import { Overlay } from "../Overlay";
import { Portal } from "../Portal";
import { modals } from "./Navbar.data";

interface Props {
	topPortalRef: React.RefObject<HTMLDivElement>;
}

type ModalType = (typeof modals)[number];
export type ModalName = ModalType['name'] | null;

export const Navbar: FC<Props> = ({ topPortalRef }) => {
	const [modal, setModal] = useState<ModalType | null>(null);

	const { Component: ModalComponent } = modal ?? {};
	const onModalClose = () => {
		setModal(null);
	};

	return (
		<>
			<ul className="flex -mr-1 md:-mr-3" >
				{modals.map((modal) => (
					<li
						key={modal.name}
						onClick={() => setModal(modal)}
						className='cursor-pointer p-1 md:p-3'
						role='button'
						tabIndex={0}
					>
						<Icon name={modal.navbarIcon} size={24} />
					</li>
				))}
			</ul>

			{ModalComponent && (
				<Portal portalRef={topPortalRef}>
					<Overlay onModalClose={onModalClose}>
						<ModalComponent />
					</Overlay>
				</Portal>
			)}
		</>
	);
};
