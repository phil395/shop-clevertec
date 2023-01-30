import type { FC } from "react";
import { InfoBanner } from "../InfoBanner";
import { Blog } from "./Blog";
import { Hero } from "./Hero";
import { HomeDecoration } from "./HomeDecoration";
import { HomeForm } from "./HomeForm";
import { HomeShowcase } from "./HomeShowcase";


interface Props {

}

export const HomeContent: FC<Props> = () => {
	return (
		<main className="container py-8">
			<Hero />
			<InfoBanner type="home-page" />
			<HomeShowcase catalog="women" />
			<HomeShowcase catalog="men" />
			<HomeDecoration />
			<HomeForm />
			<Blog />

		</main>
	);
};
