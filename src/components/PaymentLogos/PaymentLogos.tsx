import type { FC } from "react";
import Image from 'next/image';
import clsx from "clsx";

const logos = [
	['stripe', '/PaymentSystemsLogos/stripe.png'],
	['aes265', '/PaymentSystemsLogos/aes265.png'],
	['paypal', '/PaymentSystemsLogos/paypal.png'],
	['visa', '/PaymentSystemsLogos/visa.png'],
	['mastercard', '/PaymentSystemsLogos/mastercard.png'],
	['discover', '/PaymentSystemsLogos/discover.png'],
	['americanExpress', '/PaymentSystemsLogos/american-express.png'],
];

interface Props {
	size: 'small' | 'regular';
	className: string;
}

export const PaymentLogos: FC<Props> = ({ size, className }) => {
	return (
		<figure className={className}>
			{logos.map(([name, url]) => (
				<Image key={name}
					src={url}
					alt={name}
					height={22}
					width={85}
					className={clsx({
						['object-cover w-auto']: true,
						['mt-3 xl:mt-0 h-[22px]']: size === "regular",
						['h-4']: size === 'small'
					})}
				/>
			))}
		</figure>
	);
};
