import React from "react";
import { Product as ProductType } from "@/types/Product";
import Link from "next/link";
import Image from "next/image";
type ProductProps = {
	product: ProductType | undefined; // You can provide an initial empty object if needed
};
const Product = ({ product }: ProductProps) => {
	return (
		<div>
			<Link href={`/product/${product?.slug}`}>
				<div className="product-card">
					<Image
						src={product!.image[0]}
						width={250}
						height={250}
						className="product-image"
						alt={product!.name}
					/>
					<p className="product-name">{product?.name}</p>
					<p className="product-price">${product?.price}</p>
				</div>
			</Link>
		</div>
	);
};

export default Product;
