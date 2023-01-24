import type { FC } from "react";

import styles from './HomeForm.module.css';

interface Props {

}

export const HomeForm: FC<Props> = () => {
	return (
		<section className="py-16 flex flex-center overflow-hidden bg-gradient-to-t from-grey-500 to-grey-100">
			<div className="p-24 bg-white uppercase text-center">
				<h3 className="text-dark/40">Special Offer</h3>
				<div className="mt-2 text-dark font-semibold text-2xl">
					Subscribe <br /> And <span className="text-pink">Get 10% Off</span>
				</div>
				<form className={styles.form}>
					<input
						type="email"
						required
						placeholder="Enter your email"
					/>
					<button>
						Subscribe
					</button>
				</form>
			</div>
		</section>
	);
};
