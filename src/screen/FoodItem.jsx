import React, { useEffect, useState } from "react";
import Card from "../component/Card";
import Carousal from "../component/Carousal";

export default function FoodItem() {
  const [Data, setData] = useState([]);
  const [cat, setCat] = useState("Biryani/Rice");

  const handleCheckboxChange = (e) => {
    setCat(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/data", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
        // console.log(Data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Carousal />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "28px",
          fontSize: "1.5rem",
          maxWidth: "100vw",
        }}
      >
        <label>
          <input
            type="radio"
            value={"Biryani/Rice"}
            checked={cat === "Biryani/Rice"}
            onChange={handleCheckboxChange}
          />
          Biryani/Rice
        </label>
        <label>
          <input
            type="radio"
            value={"Starter"}
            checked={cat === "Starter"}
            onChange={handleCheckboxChange}
          />
          Stater
        </label>
        <label>
          <input
            type="radio"
            value={"Pizza"}
            checked={cat === "Pizza"}
            onChange={handleCheckboxChange}
          />
          Pizza
        </label>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {Data != []
          ? Data.filter((Filter) => Filter.CategoryName === cat).map((item) => (
              <div key={item._id}>
                <Card
                  id={item._id}
                  name={item.name}
                  key={item._id}
                  img={item.img}
                  description={item.description}
                  option={item.options[0]}
                />
              </div>
            ))
          : "not"}
      </div>
    </div>
  );
}
