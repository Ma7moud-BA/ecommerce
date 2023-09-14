import Image from "next/image";
import Product from "@/components/Product";
import FooterBanner from "@/components/FooterBanner";
import HeroBanner from "@/components/HeroBanner";
import { getBanners, getProducts } from "@/sanity/sanity-utils";
export default async function Home() {
	const products = await getProducts();
	const banners = await getBanners();
	return (
		<>
			<HeroBanner heroBanner={banners.length > 0 && banners[0]} />
			<div className="products-heading">
				<h2>Best Selling Products</h2>
				<p> Speakers of many variations</p>
			</div>
			<div className="products-container">
				{products?.map((product) => (
					<Product product={product} key={product._id} />
				))}
			</div>
			<FooterBanner footerBanner={banners.length > 0 && banners[0]} />
		</>
	);
}
