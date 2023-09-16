"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { StateContext } from "@/context/StateContext";
import { runSnow, runFireworks } from "@/utils/confetti";

const Success = () => {
	const { setCartItems, setTotalPrice, setTotalQuantities } =
		useContext(StateContext);
	useEffect(() => {
		runFireworks();
		localStorage.clear();
		setCartItems([]);
		setTotalPrice(0);
		setTotalQuantities(0);
	}, []);
	return (
		<div className="success-wrapper">
			<div className="success">
				<p className="icon">
					<BsBagCheckFill />
				</p>
				<h2>Thank you for your order!</h2>
				<p className="email-msg"> Check your email inbox for the receipt.</p>
				<p className="description text-center">
					If you have any questions,please email{" "}
					<a
						className="email hover:text-green-400 font-bold transition"
						href="mailto:mahmoudbanyamer@gmail.com"
					>
						mahmoudbanyamer@gmail.com
					</a>
				</p>
				<Link href={"/"}>
					<button className="btn"> Continue Shopping</button>
				</Link>
			</div>
		</div>
	);
};

export default Success;
