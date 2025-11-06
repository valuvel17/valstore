import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";

export async function getProducts() {
  try {
    const response = await fetch("/api/products", { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  } catch (err) {
    console.error("getProducts failed:", err.message);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  let planner = null;
  let stickers = [];

  for (let product of products) {
    if (product.name == "Medieval Dragon Month Planner") {
      planner = product;
    } else {
      stickers.push(product);
    }
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
