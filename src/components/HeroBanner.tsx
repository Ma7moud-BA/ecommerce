import React from "react";
import Link from "next/link";
import { Banner } from "@/types/Banner";
import Image from "next/image";
type HeroBannerProps = {
	heroBanner: Banner | false;
};
const HeroBanner = ({ heroBanner }: HeroBannerProps) => {
	// a type guard to make sure that the hero banner exists
	const heroBannerExist = heroBanner && (
		<div className="hero-banner-container">
			<div>
				<p className="text-lg"> {heroBanner.smallText}</p>
				<h3>{heroBanner.midText}</h3>
				<Image
					alt={heroBanner.product}
					className="hero-banner-image"
					src={heroBanner.image}
					height={300}
					width={300}
				></Image>

				<div>
					<Link href="/product/ID">
						<button type="button"> {heroBanner.buttonText}</button>
					</Link>
					<div className="desc">
						<h5>Description</h5>
						<p>{heroBanner.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
	return heroBannerExist;
};

export default HeroBanner;
