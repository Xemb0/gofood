import { useEffect, useState } from "react";
function MyOrder() {
  const useremail = localStorage.getItem("Useremail");
  const [orderData, setOrderData] = useState([]);
  const [orderDate, setOrderDate] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/myorder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: useremail,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        const date = result.Data
        setOrderDate(date)
        // console.log(orderDate);
        
        // Reverse the orderData array and each inner array
        const reversedData = result.Data.order_data
          .reverse()
          .map((arr) => arr.reverse());
        setOrderData(reversedData);
        // //  orderData.map((arr, i)=>arr.forEach(element => {
        //   // console.log(element.name, element.price, element.size, element.qut);

        // }));
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [useremail]);
   // Function to format date
  
  return (
    <div style={{ minHeight: "90vh" }}>
      {orderData.length === 0 ? (
        <p>no orders...</p>
      ) : (
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Size</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((arr, i) =>
              arr.map((item, j) => (
                <tr key={`${i}-${j}`}>
                  <th scope="row">{j + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.qut}</td>
                  <td>{item.size}</td>
                  <td>₹{item.price}</td>
                </tr>
                
              ))
            )}
          </tbody>
        </table>
      )}
    
    </div>
  );
}

export default MyOrder;
