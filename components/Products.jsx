"use client";

import { useEffect, useState } from "react";
import Portal from "./Portal";
import { useProducts } from "@/context/ProductContext";

export default function Products({ planner, stickers }) {
  const [portalImage, setPortalImage] = useState(null);
  const { handleIncrementProduct } = useProducts();

  // 🧠 Debug logs (solo se ejecutan en el cliente)
  useEffect(() => {
    console.log("📦 Products component mounted");
    console.log("🧩 Planner:", planner);
    console.log("🧩 Stickers:", stickers?.length || 0);

    if (!planner) {
      console.warn("⚠️ Planner is missing — the section won't render");
    }
    if (!stickers?.length) {
      console.warn("⚠️ Stickers array is empty — check getProducts() or API");
    }
  }, [planner, stickers]);

  if (!stickers?.length || !planner) {
    console.error("❌ Products component skipped render: missing data");
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <p>⚠️ Products could not be loaded. Check your API or environment.</p>
      </div>
    );
  }

  return (
    <>
      {/* 🪞 Fullscreen image modal */}
      {portalImage && (
        <Portal handleClosePortal={() => setPortalImage(null)}>
          <div className="portal-content">
            <img
              src={`/med_res/${portalImage}.jpeg`}
              alt={portalImage}
              className="img-display"
            />
          </div>
        </Portal>
      )}

      {/* 🪙 Planner section */}
      <div id="planner-section" className="section-container">
        <div className="section-header">
          <h2>Shop Our Selection</h2>
          <p>From organisation or accessorization</p>
        </div>

        <div className="planner-container">
          <div>
            <button
              onClick={() => setPortalImage("planner")}
              className="img-button"
            >
              <img src="/low_res/planner.jpeg" alt="high-res-planner" />
            </button>
          </div>

          <div className="planner-info">
            <p className="text-large planner-header">
              Medieval Dragon Month Planner
            </p>
            <h3>
              <span>$</span>14.99
            </h3>
            <p>
              Step into a realm of fantasy and organization with our{" "}
              <strong>Medieval Dragon Month Planner</strong>! This
              high-resolution PNG asset combines the fierce elegance of dragons
              with intricate medieval designs to create a planner that's both
              functional and a work of art.
            </p>
            <div className="purchase-btns">
              <button
                onClick={() =>
                  handleIncrementProduct(planner.default_price, 1, planner)
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 💾 Stickers section */}
      <div id="stickers-section" className="section-container">
        <div className="section-header">
          <h2>Or Collect Your Favourite Tech</h2>
          <p>Choose from our custom designed tech logos</p>
        </div>

        <div className="sticker-container">
          {stickers.map((sticker, i) => {
            // 🧩 Limpieza del nombre para coincidir con el archivo
            const imgName = sticker.name
              ?.replace(/ Sticker.*$/i, "")
              .replace(/\s+/g, "_")
              .replace(/\.png$/i, "")
              .replace(/\.jpeg$/i, "");

            const price = sticker.prices?.[0]?.unit_amount
              ? sticker.prices[0].unit_amount / 100
              : "—";

            // 🔍 Debug log individual por sticker
            console.log(
              `🧷 Sticker #${i + 1}:`,
              sticker.name,
              "→",
              `/low_res/${imgName}.jpeg`
            );

            return (
              <div key={i} className="sticker-card">
                <button
                  onClick={() => setPortalImage(imgName)}
                  className="img-button"
                >
                  <img
                    src={`/low_res/${imgName}.jpeg`}
                    alt={`${imgName}-low-res`}
                    onError={() =>
                      console.error(
                        `🚫 Image not found: /low_res/${imgName}.jpeg`
                      )
                    }
                  />
                </button>

                <div className="sticker-info">
                  <p className="text-medium">
                    {sticker.name || "Unnamed product"}
                  </p>
                  <p>{sticker.description || "No description available."}</p>
                  <h4>
                    <span>$</span>
                    {price}
                  </h4>
                  <button
                    disabled={price === "—"}
                    onClick={() =>
                      handleIncrementProduct(sticker.default_price, 1, sticker)
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
