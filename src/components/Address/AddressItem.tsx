import { FC } from "react";
import { Icon } from "../Icon";
import { Address } from "../../content";

interface Props extends Omit<Address, 'name'> {
	className?: string;
}

export const AddressItem: FC<Props> = ({ icon, text, href, className }) => {

	const content = (
		<>
			<Icon name={icon} size={15} className="-mt-1 mr-2" />
			{text}
		</>
	);

	if (href) {
		return (
			<a href={href} className={className}>
				{content}
			</a>
		);
	}

	return (
		<span className={className}>
			{content}
		</span>
	);
};