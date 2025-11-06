import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";

export async function getProducts() {
  try {
    // 🔍 Detectamos si es local o AWS
    const isDev = process.env.NODE_ENV === "development";

    // ✅ En local usamos localhost, en Amplify usamos dominio del deploy
    const baseUrl = isDev
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;

    // 🔍 Logs visibles en AWS Amplify
    console.log("🧠 NODE_ENV:", process.env.NODE_ENV);
    console.log("🌍 NEXT_PUBLIC_BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL);
    console.log("🌍 BASE_URL:", process.env.BASE_URL);
    console.log("🧩 Final fetch URL:", `${baseUrl}/api/products`);

    const response = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("❌ Fetch failed:", response.status, response.statusText);
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    console.log("✅ Products fetched:", data.length);
    return data;
  } catch (error) {
    console.error("🚨 Server getProducts failed:", error.message);
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

  console.log("🧾 Planner:", planner ? "Found ✅" : "Missing ❌");
  console.log("🎨 Stickers count:", stickers.length);

  return (
    <>
      <ImageBanner />
      <section>
        <Products planner={planner} stickers={stickers} />
      </section>
    </>
  );
}
