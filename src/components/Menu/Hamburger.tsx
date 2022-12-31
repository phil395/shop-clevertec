import { FC } from "react";
import clsx from "clsx";

import styles from './Hamburger.module.css';

interface Props {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	isActive: boolean;
}

export const Hamburger: FC<Props> = ({ onClick, isActive }) => {
	return (
		<button
			onClick={onClick}
			className={clsx('mr-4 md:mr-8', {
				[styles.hamburger]: true,
				[styles.hamburger_active]: isActive
			})}>
			<div className="mb-1"></div>
			<div></div>
			<div className="mt-1"></div>
		</button>
	);
};
