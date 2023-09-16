"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { StateContext } from "@/context/StateContext";

const NavBar = () => {
	const { showCart, setShowCart, totalQuantities } = useContext(StateContext);
	return (
		<div className="navbar-container">
			<p className="logo">
				<Link href="/">MBA Ecommerce</Link>
			</p>
			<button type="button" className="cart-icon">
				<AiOutlineShopping
					onClick={() => {
						setShowCart(true);
					}}
				/>
				<span className="cart-item-qty">{totalQuantities}</span>
			</button>
			{showCart && <Cart />}
		</div>
	);
};

export default NavBar;
