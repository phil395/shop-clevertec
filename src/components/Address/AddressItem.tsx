import { FC } from "react";
import { Icon } from "../Icon";
import { Address } from "../../content";

interface Props extends Omit<Address, 'name' | 'iconFill'> {
	iconSize: number;
	className?: string;
}

export const AddressItem: FC<Props> = ({ icon, iconSize, text, href, className }) => {

	const content = (
		<>
			<Icon name={icon} size={iconSize} className="-mt-1 mr-2" />
			{text}
		</>
	);

	if (href) {
		return (
			<a href={href} className={'whitespace-nowrap ' + className}>
				{content}
			</a>
		);
	}

	return (
		<span className={'whitespace-nowrap ' + className}>
			{content}
		</span>
	);
};