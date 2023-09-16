import { loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<any> | null = null; // Replace 'any' with the expected resolved type of the promise

const getStripe = () => {
	if (!stripePromise) {
		stripePromise = loadStripe(process.env.NEXT_STRIPE_PUBLISHABLE_KEY!);
	}
	return stripePromise;
};

export default getStripe;
