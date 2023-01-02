import { FC } from "react";
import { Menu } from "../../content";
import { Bestsellers } from "./Bestsellers";

type PointerEvents = Pick<
	React.HTMLAttributes<HTMLDivElement>,
	'onPointerEnter' | 'onPointerLeave'
>;

export interface MenuDropdownProps extends PointerEvents {
	dropdown: Required<Pick<Menu, 'catalog' | 'title'>>;
}

export const MenuDropdown: FC<MenuDropdownProps> = ({ dropdown: { title, catalog }, ...pointerEvents }) => {
	return (
		<dialog open {...pointerEvents} className="w-full px-0 py-7 bg-grey-100 before:bg-dark before:h-[2px] before:w-full before:absolute before:top-0">
			<div className="container flex">
				<nav className="flex flex-1 mr-4">
					{catalog.map((column, index) => (
						<div
							key={index}
							className="flex-1"
						>
							<h3 className="uppercase font-semibold mb-3">{column.group}</h3>

							<ul>
								{column.links.map((link, index) => (
									<li key={index}>
										<a
											href={link.href}
											title={link.name}
											className="py-2 block text-dark/80"
										>
											{link.name}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</nav>

				<Bestsellers catalogTitle={title} />
			</div>
		</dialog>
	);
};