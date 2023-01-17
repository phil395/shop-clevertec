import type { FC } from "react";
import { Hero } from "./Hero";


interface Props {

}

export const HomeContent: FC<Props> = () => {
	return (
		<main className="container py-8">
			<Hero />
		</main>
	);
};
