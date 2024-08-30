import React, { useEffect, useState } from "react";
import Card from "../component/Card";
import Carousal from "../component/Carousal";

export default function FoodItem() {
  const [data, setData] = useState([]);
  const [cat, setCat] = useState("Biryani/Rice");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRadioChange = (e) => {
    setCat(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/foods/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Fetched data:", result);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const parseJwt = (token) => {
    if (!token) return null;

    try {
      const base64Url = token.split('.')[1];
      const base64 = decodeURIComponent(
        atob(base64Url).split('').map((c) =>
          `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`
        ).join('')
      );
      return JSON.parse(base64);
    } catch (e) {
      console.error('Failed to parse JWT:', e);
      return null;
    }
  };

  const handleCardClick = async (id, price) => {
    console.log("Item clicked with ID:", id);
    const item = data.find((item) => item._id === id);
    if (item) {
      setSelectedItem(item);
      console.log('Selected item:', item); // Logging item to verify
  
      const token = localStorage.getItem('AuthToken');
      if (!token) {
        console.error('No AuthToken found. Please log in.');
        return;
      } else {
        console.log('Token:', token);
      }
  
      try {
        // Decode the token to get the user ID
        const decodedToken = parseJwt(token);
        const userId = decodedToken ? decodedToken.user_id : null;
        if (!userId) {
          throw new Error('User ID not found in token.');
        }
        console.log('User ID:', userId);
  
        const response = await fetch('http://localhost:4000/api/auth/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            itemId: item._id,
            name: item.name,
            price: price, // Send price here
            quantity: 1,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
  
        const result = await response.json();
        console.log('Item added to cart successfully:', result);
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }
  };
  

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
            value="Biryani/Rice"
            checked={cat === "Biryani/Rice"}
            onChange={handleRadioChange}
          />
          Biryani/Rice
        </label>
        <label>
          <input
            type="radio"
            value="Starter"
            checked={cat === "Starter"}
            onChange={handleRadioChange}
          />
          Starter
        </label>
        <label>
          <input
            type="radio"
            value="Pizza"
            checked={cat === "Pizza"}
            onChange={handleRadioChange}
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
        }}>
        {data.length > 0
          ? data.filter((item) => item.CategoryName === cat).map((item) => (
            <Card
            key={item._id}
            id={item._id}
            name={item.name}
            img={item.img}
            description={item.description}
            option={item.options ? item.options[0] : {}} // Ensure it's an object
            price={item.price}  // Pass price if necessary
            onClick={() => handleCardClick(item._id, item.price)}  // Pass item ID and price
          />
          
          ))
          : "No items available"}
      </div>
    </div>
  );
}
