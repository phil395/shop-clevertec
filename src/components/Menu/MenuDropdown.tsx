import { FC } from "react";
import { Menu } from "../../content";

export interface MenuDropdownProps {
	catalog: Exclude<Menu['catalog'], undefined>;
}

export const MenuDropdown: FC<MenuDropdownProps> = ({ catalog }) => {
	return (
		<section className="py-7 bg-grey-100">
			<nav className="container flex">
				{catalog.map((column, index) => (
					<div
						key={index}
						className="flex-1"
					>
						<h3 className="uppercase font-semibold mb-3">{column.group}</h3>

						<ul>
							{column.links.map((link, index) => (
								<li
									key={index}
									className="not-last:mb-2 text-dark/80"
								>
									<a href={link.href}>{link.name}</a>
								</li>
							))}
						</ul>
					</div>
				))}
			</nav>


		</section>
	);
};