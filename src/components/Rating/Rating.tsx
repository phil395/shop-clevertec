import clsx from "clsx";
import type { FC } from "react";
import { Icon } from "../Icon";


interface Props {
	value: number,
	size: 'small' | 'regular',
	className?: string;
}

export const Rating: FC<Props> = ({ value, size, className }) => {
	return (
		<span className={'whitespace-nowrap ' + className}>
			{Array.from({ length: 5 }, (_, index) => (
				<Icon
					key={index}
					name="star"
					size={size === 'small' ? 14 : 20}
					className={clsx({
						['text-yellow']: index < value,
						['text-grey-500']: index >= value,
						['not-last:mr-2']: size !== 'small',
						['not-last:mr-1']: size === 'small'
					})}
				/>
			))}
		</span>
	);
};
