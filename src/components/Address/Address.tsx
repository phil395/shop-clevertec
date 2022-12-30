import { FC } from "react";
import { AddressItem } from "./AddressItem";
import { ADDRESS } from "../../content";


interface Props {
	type: 'header' | 'footer';
}

export const Address: FC<Props> = ({ type }) => {


	if (type === 'header') {
		return (
			<address className="flex space-x-6 not-italic text-sm">
				{ADDRESS.map(({ name, ...restInfo }, index) => {
					// disable email link in header
					if (name === 'email') return null;
					return <AddressItem
						key={index}
						{...restInfo}
						className="max-sm:last-of-type:hidden max-[670px]:last:hidden"
					/>;
				})}
			</address>
		);
	}

	return null;

};