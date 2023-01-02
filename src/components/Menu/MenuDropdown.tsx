import { FC } from "react";
import { Menu } from "../../content";

type PointerEvents = Pick<
	React.HTMLAttributes<HTMLDivElement>,
	'onPointerEnter' | 'onPointerLeave'
>;

export interface MenuDropdownProps extends PointerEvents {
	dropdown: Required<Pick<Menu, 'catalog' | 'title'>>;
}

export const MenuDropdown: FC<MenuDropdownProps> = ({ dropdown: { title, catalog }, ...pointerEvents }) => {
	return (
		<dialog open {...pointerEvents} className="py-7 w-full bg-grey-100">
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


			{/* <Bestsellers /> */}

		</dialog>
	);
};