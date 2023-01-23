import type { FC } from "react";
import { InfoBanner } from "../InfoBanner";
import { Hero } from "./Hero";
import { HomeShowcase } from "./HomeShowcase";


interface Props {

}

export const HomeContent: FC<Props> = () => {
	return (
		<main className="container py-8">
			<Hero />
			<InfoBanner type="home-page" />
			<HomeShowcase catalog="men" />
		</main>
	);
};
