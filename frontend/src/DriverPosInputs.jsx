import { useEffect, useState } from 'react';    

function DriverPosInputs() {

    const [drivers, setDrivers] = useState({});
    
        useEffect(() => {
            fetch("http://192.168.29.125:5000/api/driverNames")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.driverNames);
                setDrivers(data.driverNames);
            })
            .catch((error) => console.error("Error fetching Driver IDs:", error));
        }, []);

    const [driverQualifyingPos, setDriverQualifyingPos] = useState({});

    function handleDriverQualifyingPosChange(driverId, event) {
        setDriverQualifyingPos(prev => ({
            ...prev,
            [driverId] : event.target.value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch("http://192.168.29.125:5000/api/submitQualifying", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(driverQualifyingPos)
            });

            console.log(response);
            const result = await response.json();
            console.log(result);
        }
        catch (error) {
            console.log("ERROR");
        }
    }

    return (
    <>
        <div>
            <h1>Driver Positions</h1>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="container">
                {
                    drivers ? Object.entries(drivers).map(([key, value]) => (
                        <>
                            <div className="card" key={key}>
                                <p>{value}</p>
                                <div className="input-container">
                                    <p>Qualifying Position: </p>
                                    <input type="number" onChange={e => handleDriverQualifyingPosChange(key, e)} value={driverQualifyingPos[key] || ""} />
                                </div>
                            </div>
                        </>
                    )) : <>
                            <div className="card">
                                <p>Max Verstappen</p>
                                <div className="input-container">
                                    <p>Qualifying Position: </p>
                                    <input type="number" name="" id="" />
                                </div>
                                <h1>Error!</h1>
                            </div>
                        </>
                }
        </div>
        <button type="submit">Submit</button>
        </form>
    </>
  );
}

export default DriverPosInputs;