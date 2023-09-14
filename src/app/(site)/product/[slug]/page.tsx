import React, { useState } from "react";
import Image from "next/image";
import { getProduct, getProducts } from "@/sanity/sanity-utils";

import Product from "@/components/Product";
import ProductDetailContainer from "@/components/ProductDetailContainer";
type ProductDetailsProps = {
	params: {
		slug: string;
	};
};
const ProductDetails = async ({ params }: ProductDetailsProps) => {
	const slug = params.slug;
	const product = await getProduct(slug);
	const products = await getProducts();

	return (
		<div>
			<ProductDetailContainer product={product} />
			<div className="maylike-products-wrapper">
				<h2>You may also like</h2>
				<div className="marquee overflow-hidden whitespace-nowrap">
					<div className="maylike-products-container animate-scroll-right-to-left">
						{products.map((product) => (
							<Product key={product._id} product={product} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
