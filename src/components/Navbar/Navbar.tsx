import { FC, useState } from "react";
import { Icon } from "../Icon";
import { MenuMobileType } from "../Menu/MenuMobile";
import { Overlay } from "../Overlay";
import { Portal } from "../Portal";
import { modals } from "./Navbar.data";

interface Props {
	topPortalRef: React.RefObject<HTMLDivElement>;
	renderMenuMobile: (setModal: React.Dispatch<MenuMobileType>, isActive: boolean) => JSX.Element;
}

type ModalType = (typeof modals)[number] | MenuMobileType;
export type ModalName = ModalType['name'] | null;

export const Navbar: FC<Props> = ({ topPortalRef, renderMenuMobile }) => {
	const [modal, setModal] = useState<ModalType | null>(null);

	const { Component: ModalComponent } = modal ?? {};
	const onModalClose = () => {
		setModal(null);
	};

	const activeModalName = modal?.name ?? null;

	return (
		<>
			{renderMenuMobile(setModal, activeModalName === 'menu')}

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
