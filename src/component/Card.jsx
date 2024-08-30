import React, { useRef, useState, useEffect } from "react";
import { useCartDispatch, useCartState } from "../ContextReducer";

export default function Card({ id, name, description, img, option, onClick }) {
  const [number, setNumber] = useState(1);
  const [size, setSize] = useState("");
  const dispatch = useCartDispatch();
  const data = useCartState();
  const sizeRef = useRef();

  // Calculate finalPrice based on selected size and quantity
  const finalPrice = number * parseInt(option[size] || 0);

  const AddToCart = async () => {
    let food = null;
    // Check if an item with the same id and size already exists in the cart
    for (let item of data) {
      if (item.id === id && item.size === size) {
        food = item;
        break;
      }
    }

    // Debugging logs
    console.log('Item ID:', id);
    console.log('Selected Size:', size);
    console.log('Final Price:', finalPrice);

    if (food) {
      // If the item with the same size exists, update its quantity and price
      await dispatch({
        type: "UPDATE",
        id: id,
        qut: food.qut + number,
        price: (food.qut + number) * parseInt(option[size] || 0),
        size: size,
      });
    } else {
      // If the item doesn't exist or size is different, add it as a new item
      await dispatch({
        type: "ADD",
        id: id,
        name: name,
        description: description,
        img: img,
        qut: number,
        size: size,
        price: finalPrice, // Ensure this value is correct
      });
    }
  };

  useEffect(() => {
    if (sizeRef.current) {
      setSize(sizeRef.current.value);
    }
  }, []);

  return (
    <div className="m-2" onClick={onClick}> {/* Call onClick when card is clicked */}
      <div
        className="card"
        style={{ width: "19rem", maxHeight: "450px", overflow: "hidden" }}
      >
        <div className="h-15" style={{ objectFit: "contain" }}>
          <img
            src={img}
            className="card-img-top"
            alt={name}
            style={{ maxHeight: "170px", objectFit: "cover" }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => setNumber(number + 1)}
              >
                +
              </button>
              {number}
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  if (number > 1) {
                    setNumber(number - 1);
                  }
                }}
              >
                -
              </button>
            </div>
            <div>
              <select
                className="bg-success p-1 rounded"
                ref={sizeRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {Object.keys(option).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div className="fs-5 d-inline">
              <h6 className="card-title">₹{finalPrice}</h6>
            </div>
          </div>
          <hr />
          <button type="button" className="btn btn-success" onClick={AddToCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
