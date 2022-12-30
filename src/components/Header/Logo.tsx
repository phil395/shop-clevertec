import { FC } from "react";
import { logo } from "../../content";
import Image from 'next/image';

interface Props { }

export const Logo: FC<Props> = () => {
	return (
		<a href={logo.href} className='flex-grow xl:flex-initial'>
			<Image src={logo.img} alt="logo" width={148} height={19} className="w-28 xs:w-36" />
		</a>
	);
};
