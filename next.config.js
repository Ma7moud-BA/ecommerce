/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
				port: "",
			},
		],
	},
	env: {
		NEXT_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_STRIPE_PUBLISHABLE_KEY,
		NEXT_STRIPE_SECRET_KEY: process.env.NEXT_STRIPE_SECRET_KEY,
		SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
		DEV_DOMAIN: process.env.DEV_DOMAIN,
		PRODUCTION_DOMAIN: process.env.PRODUCTION_DOMAIN,
	},
};

module.exports = nextConfig;
