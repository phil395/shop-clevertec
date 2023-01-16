import { FC } from "react";
import { AddressItem } from "./AddressItem";
import { ADDRESS } from "../../content";


interface Props {
	type: 'header' | 'footer';
	className?: string;
}

export const Address: FC<Props> = ({ type, className }) => {

	if (type === 'header') {
		return (
			<address className="flex space-x-6 not-italic text-sm">
				{ADDRESS.map(({ name, iconFill, text, href }, index) => {
					// disable email link in header
					if (name === 'email') return null;
					return <AddressItem
						key={index}
						icon={iconFill}
						iconSize={15}
						text={text}
						href={href}
						className="max-sm:last-of-type:hidden max-[670px]:last:hidden"
					/>;
				})}
			</address>
		);
	}

	return (
		<address className={'flex flex-col not-italic ' + className}>
			{ADDRESS.map(({ name, icon, text, href }, index) => (
				<AddressItem
					key={index}
					icon={icon}
					iconSize={20}
					text={text}
					href={href}
					className="not-last:mb-2"
				/>
			))}
		</address>
	);
};