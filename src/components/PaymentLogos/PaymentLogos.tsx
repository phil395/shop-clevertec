import type { FC } from "react";
import Image from 'next/image';
import clsx from "clsx";

const logos = [
	['stripe', '/payment-systems/stripe.png'],
	['aes265', '/payment-systems/aes265.png'],
	['paypal', '/payment-systems/paypal.png'],
	['visa', '/payment-systems/visa.png'],
	['mastercard', '/payment-systems/mastercard.png'],
	['discover', '/payment-systems/discover.png'],
	['americanExpress', '/payment-systems/american-express.png'],
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
