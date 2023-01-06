import type { FC } from "react";
import Image from 'next/image';

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
}

export const PaymentLogos: FC<Props> = ({ size }) => {
	return (
		<figure className="flex justify-between space-x-2">
			{logos.map(([name, url]) => (
				<Image key={name}
					src={url}
					alt={name}
					height={22}
					width={85}
					className={`object-cover w-auto h-[22px] ${size === 'small' ? 'h-4' : 'h-[22px]'}`}
				/>
			))}
		</figure>
	);
};
