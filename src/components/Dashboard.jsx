import { useState } from 'react';
import { UserButton } from "@clerk/clerk-react";
import LocationInput from "./LocationInput";
import MapView from "./MapView";

export default function Dashboard(){
    
    const [ origin, setOrigin ] = useState("");
    const [ destination, setDestination ] = useState("");
    const [ originCoords, setOriginCoords ] = useState(null);
    const [ destinationCoords, setDestinationCoords ] = useState(null);
    
    return (

        <div className="h-screen flex bg-white text-black">

            <div className="w-1/3 flex flex-col justify-between p-6 border-r border-gray-800 bg-white">
                
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold tracking-wide">OBER</h1>
                    <UserButton />
                </div>

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

                    <button className="w-full bg-black text-white font-semibold py-3 rounded-lg">
                        Search
                    </button>
                </div>

                <div className="text-sm text-gray-400 mt-8">
                    Ready to ride with OBER🚖
                </div>
            </div>

            <div className="w-2/3 h-full">
                <MapView
                    originCoords={originCoords}
                    destinationCoords={destinationCoords}
                />
            </div>
        </div>
    );
}