import Link from "next/link";
import type { FC } from "react";
import { FOOTER } from "../../content";
import { Address } from "../Address";
import { Icon } from "../Icon";
import { PaymentLogos } from "../PaymentLogos";
import { Socials } from "../Socials";

interface Props {
	className?: string;
}

const renderLinks = (links: typeof FOOTER[number]['links']) => {
	if (links) {
		return (
			<ul className="text-dark/80">
				{links.map(({ link, name }, index) => (
					<li key={index} className="not-last:mb-2"><Link href={link}>{name}</Link></li>
				))}
			</ul>
		);
	}
	return <Address type="footer" className="text-dark/80" />;
};

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
							className="flex-1 h-9 max-w-md font-normal bg-grey-100/20 border-transparent text-white placeholder:text-grey-900 focus:border-white focus:ring-0" />
						<button
							type="submit"
							className="py-1 px-5 border border-white whitespace-nowrap uppercase"
						>
							Join Us
						</button>
					</form>
					<Socials size={20} className="flex-0" />
				</div>
			</section>

			<section className="container max-sm:mt-2 mb-7 sm:mb-8 flex max-lg:flex-wrap lg:justify-between">
				{FOOTER.map(({ title, links }, index) => (
					<div key={index} className="mt-8 max-sm:hidden max-lg:flex-1 max-lg:basis-1/2">
						<h5 className="mb-3 uppercase font-semibold text-dark">{title}</h5>
						{renderLinks(links)}
					</div>
				))}

				{FOOTER.map(({ title, links }, index) => (
					<details key={index} className="sm:hidden pt-3 border-b-[1px] border-b-grey-500 flex-shrink-0 flex-grow basis-full group">
						<summary className="flex justify-between mb-3 list-none [&+*]:mb-3">
							{title}
							<Icon name="arrow" size={20} className="text-dark group-open:rotate-180 group-open:stroke-2 transition-transform" />
						</summary>
						{renderLinks(links)}
					</details>
				))}
			</section>

			<div className="bg-grey-100 py-3">
				<div className="container flex justify-between max-[840px]:flex-col max-[840px]:items-center text-dark/60 text-sm">
					<span>Copyright © 2032 all rights reserved</span>
					<PaymentLogos size="small" className="flex flex-center space-x-3 grayscale flex-wrap max-[840px]:[&>img]:mt-3" />
					<a href="https://clevertec.ru" className="max-[840px]:mt-3">Clevertec.ru/training</a>
				</div>
			</div>
		</footer>
	);
};
