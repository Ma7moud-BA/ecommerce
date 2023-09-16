"use client";
import { Product } from "@/types/Product";
import React, { createContext, useState, useEffect, ReactNode } from "react";

import toast from "react-hot-toast";

export interface ProductWithQuantity extends Product {
	quantity: number;
}
type Value = {
	showCart: boolean;
	setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
	cartItems: ProductWithQuantity[];
	setCartItems: React.Dispatch<React.SetStateAction<ProductWithQuantity[]>>;
	totalPrice: number;
	setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
	totalQuantities: number;
	setTotalQuantities: React.Dispatch<React.SetStateAction<number>>;
	qty: number;
	incQty: () => void;
	decQty: () => void;
	onAdd: (product: ProductWithQuantity, quantity: number) => void;
	toggleCartItemQuantity: (
		id: string,
		action: "increment" | "decrement"
	) => void;
	onRemove: (product: ProductWithQuantity) => void;
};
export const StateContext = createContext<Value>({} as Value);
const StateProvider = ({ children }: { children: ReactNode }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState<ProductWithQuantity[]>([]);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [totalQuantities, setTotalQuantities] = useState<number>(0);
	const [qty, setQty] = useState<number>(1);

	//increase quantity
	const incQty = () => {
		setQty((prev) => prev + 1);
	};
	const decQty = () => {
		setQty((prev) => {
			if (prev - 1 < 1) return 1;
			return prev - 1;
		});
	};
	const onAdd = (product: ProductWithQuantity, quantity: number) => {
		// check if the product already exists in the cart then add one to it
		const checkProductInCart = cartItems.find(
			(item) => item._id === product._id
		);

		setTotalPrice((prev) => prev + product.price * quantity);
		setTotalQuantities((prev) => prev + quantity);
		if (checkProductInCart) {
			const updatedCartItems = cartItems.map((cartProduct) => {
				if (cartProduct._id === product._id)
					return {
						...cartProduct,
						quantity: cartProduct.quantity + quantity,
					};
			});
			setCartItems(updatedCartItems);
		} else {
			product.quantity = quantity;
			setCartItems([...cartItems, { ...product }]);
		}
		toast.success(`${qty} ${product.name} added to the cart.`);
	};
	const toggleCartItemQuantity = (
		id: string,
		action: "increment" | "decrement"
	) => {
		// const foundProduct = cartItems.find((item) => item._id === id);

		// if (!foundProduct) {
		// 	// Product not found, handle error or return early
		// 	return;
		// }

		const updatedCartItems = cartItems.map((item) => {
			if (item._id === id) {
				if (action === "increment") {
					setTotalPrice((prev) => prev + item.price);
					setTotalQuantities((prev) => prev + 1);

					return { ...item, quantity: item.quantity + 1 };
				} else if (action === "decrement" && item.quantity > 1) {
					setTotalPrice((prev) => prev - item.price);
					setTotalQuantities((prev) => prev - 1);
					return { ...item, quantity: item.quantity - 1 };
				}
			}
			return item;
		});

		// Update the cartItems state with the modified array
		setCartItems(updatedCartItems);
	};
	const onRemove = (product: ProductWithQuantity) => {
		const filteredCartItems = cartItems.filter((item) => {
			return item._id !== product._id;
		});
		setTotalQuantities((prev) => prev - product.quantity);
		setTotalPrice((prev) => prev - product.price * product.quantity);
		setCartItems(filteredCartItems);
	};

	return (
		<StateContext.Provider
			value={{
				showCart: showCart,
				setShowCart: setShowCart,
				cartItems: cartItems,
				setCartItems: setCartItems,

				totalPrice: totalPrice,
				setTotalPrice: setTotalPrice,
				totalQuantities: totalQuantities,
				setTotalQuantities: setTotalQuantities,
				qty: qty,
				incQty: incQty,
				decQty: decQty,
				onAdd: onAdd,
				toggleCartItemQuantity: toggleCartItemQuantity,
				onRemove: onRemove,
			}}
		>
			{children}
		</StateContext.Provider>
	);
};
export default StateProvider;
