import type { FC } from "react";
import { Socials } from "../Socials";

interface Props {
	className?: string;
}

export const Footer: FC<Props> = ({ className }) => {
	return (
		<footer className={className}>
			<section className="py-3 bg-dark text-white font-semibold uppercase">
				<div className="container flex flex-col md:flex-row max-md:space-y-3 md:space-x-3 justify-between items-center">
					<h6 className="flex-grow-0 flex-shrink">BE&nbsp;IN&nbsp;TOUCH WITH&nbsp;US</h6>
					<form className="flex-1 max-md:w-full flex flex-center space-x-3">
						<input
							type="email"
							required
							placeholder="Enter your email"
							className="flex-1 h-9 max-w-md font-normal bg-grey-100/20 border-transparent text-white placeholder:text-grey-900" />
						<button
							type="submit"
							className="py-1 px-5 border border-white whitespace-nowrap"
						>
							Join Us
						</button>
					</form>
					<Socials size={20} className="flex-0" />
				</div>
			</section>
		</footer>
	);
};
