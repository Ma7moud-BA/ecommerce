import { loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<any> | null = null; // Replace 'any' with the expected resolved type of the promise

const getStripe = () => {
	if (!stripePromise) {
		console.log(process.env.NEXT_STRIPE_PUBLISHABLE_KEY);
		stripePromise = loadStripe(process.env.NEXT_STRIPE_PUBLISHABLE_KEY!);
		console.log("stripePromise: ", stripePromise);
	}
	return stripePromise;
};

export default getStripe;
