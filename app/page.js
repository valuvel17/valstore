export const dynamic = "force-dynamic";

import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";

export async function getProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) console.error("Missing NEXT_PUBLIC_BASE_URL!");

    console.log("BASE_URL used:", baseUrl);

    const response = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = await response.json();
    console.log("Products fetched:", data.length);
    return data;
  } catch (error) {
    console.error("Server getProducts failed:", error.message);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  let planner = null;
  let stickers = [];

  for (const product of products) {
    if (product.name === "Medieval Dragon Month Planner") planner = product;
    else stickers.push(product);
  }

  return (
    <>
      <ImageBanner />
      <section>
        <Products planner={planner} stickers={stickers} />
      </section>
    </>
  );
}
