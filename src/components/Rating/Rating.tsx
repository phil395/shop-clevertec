import clsx from "clsx";
import type { FC } from "react";
import { Icon } from "../Icon";

export type RatingValue = 1 | 2 | 3 | 4 | 5;

interface Props {
	value: RatingValue,
	size: 'small' | 'regular',
	className?: string;
}

export const Rating: FC<Props> = ({ value, size, className }) => {
	return (
		<span className={className}>
			{Array.from({ length: 5 }, (_, index) => {
				return (
					<Icon
						name="star"
						size={size === 'small' ? 14 : 20}
						className={clsx({
							['text-yellow']: index < value,
							['text-grey-500']: index >= value,
							['not-last:mr-2']: size !== 'small',
							['not-last:mr-1']: size === 'small'
						})}
					/>
				);
			})}
		</span>
	);
};
