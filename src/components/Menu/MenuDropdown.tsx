import { FC } from "react";
import { Menu } from "../../content";
import { Slider } from "../Slider/Slider";

type PointerEvents = Pick<
	React.HTMLAttributes<HTMLDivElement>,
	'onPointerEnter' | 'onPointerLeave'
>;

export interface MenuDropdownProps extends PointerEvents {
	dropdown: Required<Menu>;
}

export const MenuDropdown: FC<MenuDropdownProps> = ({ dropdown: { title, catalog, link }, ...pointerEvents }) => {
	console.log({ catalog, title });
	return (
		<dialog open {...pointerEvents} className="w-full px-0 py-7 z-10 bg-grey-100 shadow-md before:bg-dark before:h-[2px] before:w-full before:absolute before:top-0">
			<div className="container flex justify-between">
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

				<Slider
					type="small"
					catalog={{ name: title.toLowerCase(), slug: link }}
					heading="Bestsellers"
					className="w-[576px]"
				/>
			</div>
		</dialog>
	);
};