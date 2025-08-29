import DriverPosInputs from "./DriverPosInputs.jsx";
import "./App.css"
import { useEffect, useState } from 'react';

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://192.168.29.125:5000/api/data")
    .then((response) => response.json())
    .then((data) => setMessage(data.message))
    .catch((error) => console.error("Error fetching message:", error));
  }, []);
  
  return (
    <>
      {message}
      <DriverPosInputs />
    </>
  );
}

export default App;
