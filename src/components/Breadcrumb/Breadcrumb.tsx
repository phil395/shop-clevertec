import Link from "next/link";
import type { FC } from "react";
import { capitalize } from "../../utils";

interface Props {
	path: BreadcrumbItem[];
	// className?: string;
}

export interface BreadcrumbItem {
	name: string;
	slug?: string;
}

export const Breadcrumb: FC<Props> = ({ path }) => {
	return (
		<nav>
			<ul className="text-sm">
				{path.map((item, index) => (
					<li
						key={index}
						className='inline'
					>
						{item.slug ? (
							<Link
								href={item.slug}
								className="text-dark/60 after:content-['>'] after:pl-4 after:mr-4"
							>
								{capitalize(item.name)}
							</Link>
						) : (
							<span>{capitalize(item.name)}</span>
						)}
					</li>
				))}
			</ul>
		</nav>
	);
};
