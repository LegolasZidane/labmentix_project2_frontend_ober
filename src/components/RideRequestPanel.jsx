import { useState, useEffect } from 'react';
import FareEstimate from './FareEstimate';
import LocationInput from "./LocationInput";
import axios from "axios";

export default function RideRequestPanel({ originCoords, setOriginCoords, destinationCoords, setDestinationCoords}){

    const [ origin, setOrigin ] = useState("");
    const [ destination, setDestination ] = useState("");
    const [ ride, setRide ] = useState(null);
    const [ isPaid, setIsPaid ] = useState(null);

    const handleRequestRide = async () => {

        if( !originCoords || !destinationCoords ){
            alert("Please select both pickup and dropoff locations");
            return;
        }

        try {

            const res = await axios.post("https://labmentix-project2-backend-ober.onrender.com/rides", {
                origin: originCoords,
                destination: destinationCoords
            });
            
            setRide(res.data);
        }   catch(err){
            console.error("Failed to request ride:", err);
            alert("Failed to request ride");
        }
    };

    const handlePayment = async () => {

        try {

            const res = await axios.post("https://labmentix-project2-backend-ober.onrender.com/payment/create-session", {
                rideId: ride.id,
                fare: ride.fare
            });

            window.location.href = res.data.url;

        }   catch(err){

            console.error("Payment error:", err);
            alert("Failed to initiate payment");

        }
    };

    useEffect(() => {

        if( window.location.pathname === '/payment-success' && ride ){
            setIsPaid(true);
        }

    }, []);

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

                    {ride && (
                        <div className="mt-6 p-4 border rounded bg-gray-100">
                            <h2 className="text-lg font-bold">Driver Assigned🚖</h2>
                            <p><strong>Name:</strong> {ride.driver.name}</p>
                            <p><strong>Vehicle:</strong> {ride.driver.vehicle}</p>
                            <p><strong>Phone:</strong> {ride.driver.phone}</p>
                            <p><strong>Fare:</strong> ₹{ride.fare}</p>

                            { isPaid ? (
                                <p className="text-green-600 font-semibold mt-2">✅ Payment Completed</p>
                            ) : (
                                <button
                                    onClick={handlePayment} 
                                    className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Pay Now
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="text-sm text-gray-400 mt-8">
                Ready to ride with OBER🚖
            </div>
        </div>
    );
}