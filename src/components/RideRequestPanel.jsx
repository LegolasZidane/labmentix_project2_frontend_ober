import { useState } from 'react';
import FareEstimate from './FareEstimate';
import LocationInput from "./LocationInput";
import axios from "axios";

export default function RideRequestPanel({ originCoords, setOriginCoords, destinationCoords, setDestinationCoords}){

    const [ origin, setOrigin ] = useState("");
    const [ destination, setDestination ] = useState("");

    const handleRequestRide = async () => {

        if( !originCoords || !destinationCoords ){
            alert("Please select both pickup and dropoff locations");
            return;
        }

        try {

            const res = await axios.post("http://localhost:3000/rides", {
                origin: originCoords,
                destination: destinationCoords
            });
            console.log("Ride requested:", res.data);
            alert("Ride requested successfully!");
        }   catch(err){
            console.error("Failed to request ride:", err);
            alert("Failed to request ride");
        }
    };

    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <h1 className="text-3xl font-bold mb-6">OBER</h1>

                <div className="space-y-4">
                    <LocationInput
                        label="Pickup Location"
                        value={origin}
                        setValue={setOrigin}
                        setCoords={setOriginCoords}
                    />

                    <LocationInput
                        label="Dropoff Location"
                        value={destination}
                        setValue={setDestination}
                        setCoords={setDestinationCoords}
                    />

                    <button 
                        className="w-full bg-black text-white font-semibold py-3 rounded-lg"
                        onClick={handleRequestRide}
                    >
                        Request a Ride
                    </button>

                    <FareEstimate
                        originCoords={originCoords}
                        destinationCoords={destinationCoords}
                    />
                </div>
            </div>

            <div className="text-sm text-gray-400 mt-8">
                Ready to ride with OBER🚖
            </div>
        </div>
    );
}