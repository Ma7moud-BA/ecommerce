"use client";
import { ProductWithQuantity, StateContext } from "@/context/StateContext";
import { Product } from "@/types/Product";
import Image from "next/image";
import React, { useContext, useState } from "react";
import {
	AiFillStar,
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineStar,
} from "react-icons/ai";
type ProductDetailContainerProps = {
	product: Product;
};
const ProductDetailContainer = ({ product }: ProductDetailContainerProps) => {
	const [index, setIndex] = useState<number>(0);
	const { incQty, decQty, qty, onAdd, cartItems, setShowCart } =
		useContext(StateContext);

	const handleBuyNow = async () => {
		onAdd(product, qty);
		setShowCart(true);
	};
	return (
		<div className="product-detail-container">
			<div>
				<div>
					<Image
						src={product?.image[index]}
						width={500}
						height={500}
						alt={product?.name}
						className="product-detail-image"
					></Image>
				</div>
				<div className="small-images-container">
					{product.image.map((image: string, i: number) => (
						<Image
							key={i}
							src={image}
							width={150}
							height={150}
							alt="img"
							className={
								i === index ? "small-image selected-image" : "small-image"
							}
							onMouseEnter={() => {
								setIndex(i);
							}}
						></Image>
					))}
				</div>
			</div>
			<div className="product-detail-desc">
				<h1>{product.name}</h1>
				<div className="reviews">
					<div>
						<AiFillStar />
						<AiFillStar />
						<AiFillStar />
						<AiFillStar />
						<AiOutlineStar />
					</div>
					<p>(20)</p>
				</div>
				<h4>Details: </h4>
				<p>{product.details}</p>
				<p className="price">${product.price}</p>
				<div className="quantity">
					<h2>Quantity:</h2>
					<p className="quantity-desc">
						<span className="minus" onClick={decQty}>
							<AiOutlineMinus />
						</span>
						<span className="num">{qty}</span>
						<span className="plus" onClick={incQty}>
							<AiOutlinePlus />
						</span>
					</p>
				</div>
				<div className="buttons">
					<button
						type="button"
						className="add-to-cart"
						onClick={() => {
							onAdd(product, qty);
						}}
					>
						Add to cart
					</button>
					<button type="button" onClick={handleBuyNow} className="buy-now">
						Buy now
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailContainer;
