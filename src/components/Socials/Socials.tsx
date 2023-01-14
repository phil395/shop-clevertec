import { FC } from "react";
import { Icon } from "../Icon";
import { SOCIALS } from "../../content";

interface Props {
	size?: number;
	className?: string;
}

export const Socials: FC<Props> = ({ className, size = 15 }) => {
	return (
		<address className={className}>
			{SOCIALS.map(({ icon, href }, index) => (
				<a key={index} href={href} className='not-last:mr-3'>
					<Icon name={icon} size={size} />
				</a>
			))}
		</address>
	);
};