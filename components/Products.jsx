"use client";

import { useState } from "react";
import Portal from "./Portal";
import { useProducts } from "@/context/ProductContext";

export default function Products({ planner, stickers }) {
  const [portalImage, setPortalImage] = useState(null);
  const { handleIncrementProduct } = useProducts();

  if (!stickers?.length || !planner) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "tomato" }}>
        <h3>⚠️ No se pudieron cargar los productos.</h3>
        <p>
          Esto puede deberse a un error al conectarse con la API de Stripe o a
          una URL incorrecta.
        </p>
      </div>
    );
  }

  return (
    <>
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

      {/* Planner section */}
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
              with intricate medieval designs to create a planner that's not
              only functional but also a work of art.
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

      {/* Stickers section */}
      <div id="stickers-section" className="section-container">
        <div className="section-header">
          <h2>Or Collect Your Favourite Tech</h2>
          <p>Choose from our custom designed tech logos</p>
        </div>

        <div className="sticker-container">
          {stickers.map((sticker, i) => {
            const imgName = sticker.name
              ?.replaceAll(" Sticker.png", "")
              .replaceAll(" ", "_");

            const price = sticker.prices?.[0]?.unit_amount
              ? sticker.prices[0].unit_amount / 100
              : "—";

            return (
              <div key={i} className="sticker-card">
                <button
                  onClick={() => setPortalImage(imgName)}
                  className="img-button"
                >
                  <img
                    src={`/low_res/${imgName}.jpeg`}
                    alt={`${imgName}-low-res`}
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
