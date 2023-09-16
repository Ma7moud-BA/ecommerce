import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { ProductWithQuantity } from "@/context/StateContext";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY);

	try {
		// Create Checkout Sessions from body params.
		const params = {
			submit_type: "pay",
			mode: "payment",
			payment_method_types: ["card"],
			billing_address_collection: "auto",
			shipping_options: [
				{ shipping_rate: "shr_1NqwmzFjo19Dtje8htJJVDxG" },
				{ shipping_rate: "shr_1NqwojFjo19Dtje8lDQn0Act" },
				{ shipping_rate: "shr_1NqwqIFjo19Dtje8vPfInStS" },
			],
			line_items: body.map((item: ProductWithQuantity) => {
				return {
					price_data: {
						currency: "usd",
						product_data: {
							name: item.name,
							images: [item.image[0]],
						},
						unit_amount: item.price * 100,
					},
					adjustable_quantity: {
						enabled: true,
						minimum: 1,
					},
					quantity: item.quantity, // Add quantity here
				};
			}),

			success_url: `${process.env.DEV_DOMAIN}/success`,
			cancel_url: `${process.env.DEV_DOMAIN}`,
		};
		const session = await stripe.checkout.sessions.create(params);
		return NextResponse.json(session); // Return an object with the URL
	} catch (err: any) {
		return NextResponse.json({ error: err.message }); // Return an error object
	}
}
