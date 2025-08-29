import { useEffect, useState } from 'react';    


function DriverPosInputs() {

    const [driverIds, setDriverIds] = useState();
    
        useEffect(() => {
            fetch("http://192.168.29.125:5000/api/driverIds")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.driverIds);
                setDriverIds(data.driverIds);
            })
            .catch((error) => console.error("Error fetching Driver IDs:", error));
        }, []);

    return (
    <>
        <div>
            <h1>Driver Positions</h1>
        </div>
        <div className="driver-name-container">
            {driverIds ? Object.entries(driverIds).map(([key, _]) => (
                <>
                <label>{key}</label>
                <input type="number" key={key} /><br />
                </>
            )) : <>
                    <div className="driver-card">
                        <p>Max Verstappen</p>
                        <div className="qualifying-input-container">
                            <p>Qualifying Position: </p>
                            <input type="number" name="" id="" />
                        </div>
                    </div>
                </>}
        </div>
        <div>
            <br />
            <label>Total rain before race start (time period of 4 hours)</label><input type="number" /><br />
            <label>Total rain from race start onwards (time period of 3 hours)</label><input type="number" /><br />
        </div>
        <div>
            <label>Track Location</label><br />
            <label>Hello there Dad</label><br />
            <label>Hello there Mom</label>
        </div>
    </>
  );
}

export default DriverPosInputs;