from flask import Flask, jsonify, request
from flask_cors import CORS
from names_and_ids import driver_ids, driver_names

app = Flask(__name__)
CORS(app)  # Enable CORS for React

@app.route("/api/data")
def data():
    return jsonify({"message": "Hi from Flask!"})

@app.route("/api/driverIds")
def get_driver_ids():    
    return jsonify({"driverIds": driver_ids})

@app.route("/api/driverNames")
def get_driver_names():
    temp = [1, 2, 3, 4, 7, 8, 9, 12, 13, 15, 17, 19, 20, 24, 25, 26, 27, 30, 31, 32]
    driver_names_2025 = {}

    for id in temp:
        driver_names_2025[id] = driver_names[id]

    return jsonify({"driverNames": driver_names_2025})

@app.route("/api/submitQualifying", methods=["POST"])
def submitQualifying():
    data = request.get_json()
    print(data)
    return(jsonify({"status": "Recieved"}))

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")