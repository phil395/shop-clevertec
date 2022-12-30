import { FC } from "react";
import { Icon } from "../Icon";
import { SOCIALS } from "../../content";

interface Props {

}

export const Socials: FC<Props> = ({ }) => {
	return (
		<address>
			{SOCIALS.map(({ icon, href }, index) => (
				<a key={index} href={href} className='not-last:mr-3'>
					<Icon name={icon} size={15} />
				</a>
			))}
		</address>
	);
};