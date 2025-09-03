import { useEffect, useState } from 'react';    

function DriverPosInputs() {

    const [drivers, setDrivers] = useState({});
    const [tracks, setTracks] = useState({});
    
        useEffect(() => {
            fetch("http://192.168.29.125:5000/api/driverNames")
            .then((response) => response.json())
            .then((data) => {
                setDrivers(data.driverNames);
            })
            .catch((error) => console.error("Error fetching Driver IDs:", error));

            fetch("http://192.168.29.125:5000/api/trackNames")
            .then((response) => response.json())
            .then((data) => {
                setTracks(data.trackNames);
            })
            .catch((error) => console.error("Error fetching Track IDs:", error));
        }, []);

    const [driverQualifyingPos, setDriverQualifyingPos] = useState({});
    const [gapsToPole, setGapsToPole] = useState({});
    const [weather, setWeather] = useState({});
    const [trackId, setTrackId] = useState();

    function handleDriverQualifyingPosChange(driverId, event) {
        setDriverQualifyingPos(prev => ({
            ...prev,
            [driverId] : event.target.value
        }));
    }

    function handleGapsToPole(driverId, event) {
        setGapsToPole(prev => ({
            ...prev,
            [driverId] : event.target.value
        }));
    }

    function handleGapToPole(driverId, event) {
        setDriverQualifyingPos(prev => ({
            ...prev,
            [driverId] : event.target.value
        }));
    }

    function handleWeatherChange(attribute, event) {
        setWeather(prev => ({
            ...prev,
            [attribute] : event.target.value
        }));
    }

    function handleTrackChange(id) {
        setTrackId(t => t = id);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch("http://192.168.29.125:5000/api/submitQualifying", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify([driverQualifyingPos, gapsToPole, trackId, weather])
            });

            console.log(response);
            const result = await response.json();
            console.log(result);
        }
        catch (error) {
            console.log(error);
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
                        Object.entries(drivers).map(([key, value]) => (
                            <>
                                <div className="card" key={key}>
                                    <p>{value}</p>
                                    <div className="input-container">
                                        <div>
                                            <p>Qualifying Position: </p>
                                            <input type="number" onChange={e => handleDriverQualifyingPosChange(key, e)} value={driverQualifyingPos[key] || ""} />
                                        </div>
                                        <div>
                                            <p>Gap to Pole: </p>
                                            <input type="number" onChange={e => handleGapsToPole(key, e)} value={gapsToPole[key] || ""} />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                    <div className="card">
                        <p>Wind Speed</p>
                        <div className="input-container">
                            <input type="number" onChange={e => handleWeatherChange("wind-speed", e)} value={weather["wind-speed"] || ""} />
                        </div>
                    </div>
                    <div className="card">
                        <p>Apparent Temp</p>
                        <div className="input-container">
                            <input type="number" onChange={e => handleWeatherChange("apparent-temp", e)} value={weather["apparent-temp"] || ""} />
                        </div>
                    </div>
                    <div className="card">
                        <p>Relative Humidity</p>
                        <div className="input-container">
                            <input type="number" onChange={e => handleWeatherChange("relative-humidity", e)} value={weather["relative-humidity"] || ""} />
                        </div>
                    </div>
                    <div className="card">
                        <p>Rain Before</p>
                        <div className="input-container">
                            <input type="number" onChange={e => handleWeatherChange("rain-before", e)} value={weather["rain-before"] || ""} />
                        </div>
                    </div>
                    <div className="card">
                        <p>Rain During</p>
                        <div className="input-container">
                            <input type="number" onChange={e => handleWeatherChange("rain-during", e)} value={weather["rain-during"] || ""} />
                        </div>
                    </div>
                    <select onChange={event => handleTrackChange(event.target.value)}>
                        <option selected disabled>Select a track</option>
                        {
                            Object.entries(tracks).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))
                        }
                    </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    </>
  );
}

export default DriverPosInputs;