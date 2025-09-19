import { useEffect, useState } from "react";
import axios from "axios";

export default function FareEstimate({ originCoords, destinationCoords}){

const [ estimate, setEstimate ] = useState(null);

useEffect(() => {

    const fetchFare = async () => {

        if( !originCoords || !destinationCoords ){
            setEstimate(null);
            return;
        }

        try{

            const res = await axios.post("https://labmentix-project2-backend-ober.onrender.com/fare/estimate", {
                origin: originCoords, 
                destination: destinationCoords
            });
            setEstimate(res.data);

        }   catch(err){
            console.error("Failed to fetch fare estimate:", err);
            setEstimate(null);
        }

    };

    fetchFare();
}, [originCoords, destinationCoords]);

if( !estimate ) return null;

return (
        <div className="bg-gray-100 p-4 rounded-lg text-black font-semibold">
            <p>Distance: {estimate.distance} km</p>
            <p>Estimated Fare: ₹{estimate.fare}</p>
        </div>
    );
}