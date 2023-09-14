import { createClient, groq } from "next-sanity";
import config from "./config/client-config";
import { Product } from "@/types/Product";
import { Banner } from "@/types/Banner";
export const getProducts = async (): Promise<Product[]> => {
	const client = createClient(config);

	return client.fetch(groq`*[_type=="product"]{
        _id,
        _createdAt,
        _updatedAt,
        name,
        "slug":slug.current,
        'image':image[].asset->url,
        price,
        details    }`);
};
export const getProduct = async (slug: string): Promise<Product> => {
	const client = createClient(config);

	return client.fetch(
		groq`*[_type=="product" && slug.current==$slug][0]{
        _id,
        _createdAt,
        _updatedAt,
        name,
        "slug":slug.current,
        'image':image[].asset->url,
        price,
        details    }`,
		{ slug }
	);
};
export const getBanners = async (): Promise<Banner[]> => {
	const client = createClient(config);

	return client.fetch(groq`*[_type=="banner"]{
        _id,
        _createdAt,
        _updatedAt,
        "image":image.asset->url,
        buttonText,
        product,
        description,
        smallText,
        midText,
        largeText1,
        largeText2,
        discount,
        buttonText,
        saleTime



        }`);
};
