import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";
// const projectId: string = process.env.SANITY_PROJECT_ID!;

export default defineConfig({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: "production",
	title: "Ecommerce",
	basePath: "/admin",
	apiVersion: "2021-10-21",
	plugins: [deskTool()],
	schema: { types: schemas },
});
