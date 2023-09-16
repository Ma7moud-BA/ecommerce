import React, { useContext, useRef } from "react";
import Link from "next/link";
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineLeft,
	AiOutlineShopping,
} from "react-icons/ai";
import getStripe from "../helpers/getStripe";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { StateContext } from "@/context/StateContext";
import Image from "next/image";
const Cart = () => {
	const cartRef = useRef();
	const {
		totalPrice,
		totalQuantities,
		cartItems,
		setShowCart,
		toggleCartItemQuantity,
		onRemove,
	} = useContext(StateContext);
	const handleCheckout = async () => {
		const stripe = await getStripe();
		try {
			const res = await fetch("/api/stripe", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(cartItems),
			});
			const data = await res.json();

			toast.loading("Redirecting...");

			stripe.redirectToCheckout({ sessionId: data.id });
		} catch (error: any) {
			console.error(error.message);
		}
	};

	return (
		<div className="cart-wrapper" ref={cartRef}>
			<div className="cart-container">
				<button className="cart-heading" onClick={() => setShowCart(false)}>
					<AiOutlineLeft />
					<span className="heading">Your Cart</span>
					<span className="cart-num-items">{totalQuantities} items</span>
				</button>
				{cartItems.length < 1 ? (
					<div className="empty-cart">
						{" "}
						<AiOutlineShopping size={150} />
						<h3>Your shopping cart is empty</h3>
						<Link href={"/"}></Link>
						<button
							className="btn"
							onClick={() => {
								setShowCart(false);
							}}
						>
							{" "}
							Continue Shopping
						</button>
					</div>
				) : (
					<div className="product-container">
						{cartItems.map((item) => (
							<div key={item._id} className="product">
								<Image
									src={item?.image[0]}
									height={200}
									width={200}
									alt={item.name}
									className="cart-product-image"
								/>
								<div className="item-desc flex-col">
									<div className="flex  gap-10">
										<h5>{item.name}</h5>
										<h4>${item.price}</h4>
									</div>
									<div className=" flex justify-between  ">
										<div>
											<p className="quantity-desc">
												<span
													className="minus"
													onClick={() => {
														toggleCartItemQuantity(item._id, "decrement");
													}}
												>
													<AiOutlineMinus />
												</span>
												<span className="num">{item.quantity}</span>
												<span
													className="plus"
													onClick={() => {
														toggleCartItemQuantity(item._id, "increment");
													}}
												>
													<AiOutlinePlus />
												</span>
											</p>
										</div>
										<button className="remove-item">
											<TiDeleteOutline
												onClick={() => {
													onRemove(item);
												}}
											/>
										</button>
									</div>
								</div>
							</div>
						))}
						<div className="cart-bottom ">
							<div className="total">
								<h3>Subtotal:</h3>
								<h3>${totalPrice}</h3>
							</div>
							<div className="btn-container">
								<button className="btn" onClick={handleCheckout}>
									{" "}
									pay with stripe
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
