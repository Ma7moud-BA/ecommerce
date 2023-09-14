import React from "react";
import { Banner } from "@/types/Banner";
import Link from "next/link";
import Image from "next/image";
type FooterBannerProps = {
	footerBanner: Banner | false;
};
const FooterBanner = ({ footerBanner }: FooterBannerProps) => {
	const FooterBannerExist = footerBanner && (
		<div className="footer-banner-container">
			<div className="banner-desc">
				<div className="left">
					<p>{footerBanner.discount}</p>
					<h3>{footerBanner.largeText1}</h3>
					<h3>{footerBanner.largeText2}</h3>
					<h3>{footerBanner.saleTime}</h3>
				</div>
				<div className="right">
					<p>{footerBanner.smallText}</p>
					<h3>{footerBanner.midText}</h3>
					<p>{footerBanner.description}</p>
					<Link href={`/product/${footerBanner.product}`}>
						<button type="button">{footerBanner.buttonText}</button>
					</Link>
				</div>
				<Image
					src={footerBanner.image}
					className="footer-banner-image"
					width={250}
					height={250}
					alt={footerBanner.product}
				></Image>
			</div>
		</div>
	);
	return FooterBannerExist;
};

export default FooterBanner;
