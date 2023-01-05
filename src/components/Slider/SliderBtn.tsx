import { FC, useEffect, useState } from "react";
import { SliderSubscribe } from "../../hooks";
import { Icon } from "../Icon";

interface Props {
	onClick: () => void;
	className: string;
	size: number;
	subscribe: SliderSubscribe;
}

export const SliderBtn: FC<Props> = ({ onClick, className, size, subscribe }) => {
	const [isHidden, setIsHidden] = useState(false);

	useEffect(() => {
		return subscribe(setIsHidden);
	}, []);

	return (
		<button
			onClick={onClick}
			className={className}
		>
			<Icon name="arrow" size={size} />
		</button>
	);
};
