import type { FC } from "react";

interface Props {
	heading?: string;
	// type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Divider: FC<Props> = ({ heading /* type */ }) => {
	if (heading) {
		return (
			<div className="my-7 flex space-x-5 items-center">
				<h2 className="mt-1 flex-0 uppercase font-semibold">{heading}</h2>
				<hr className='w-full border-grey-500 border-2 border-b-0' />
			</div>
		);
	}
	return (
		<hr className='my-7 border-grey-500 border-2 border-b-0 ' />
	);
};
