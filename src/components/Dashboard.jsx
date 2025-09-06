import { useState } from 'react';
import { UserButton } from "@clerk/clerk-react";
import MapView from "./MapView";
import RideRequestPanel from './RideRequestPanel';

export default function Dashboard(){

    const [ originCoords, setOriginCoords ] = useState(null);
    const [ destinationCoords, setDestinationCoords ] = useState(null);
    
    return (

        <div className="h-screen flex bg-white text-black">

            <div className="w-1/3 flex flex-col justify-between p-6 border-r border-gray-800 bg-white">
                
                <div className="flex justify-end mb-4">
                    <UserButton />
                </div>
            
                <RideRequestPanel
                    originCoords={originCoords}
                    setOriginCoords={setOriginCoords}
                    destinationCoords={destinationCoords}
                    setDestinationCoords={setDestinationCoords}
                />
            </div>

            <div className="w-2/3 h-screen">
                <MapView
                    originCoords={originCoords}
                    destinationCoords={destinationCoords}
                />
            </div>
        </div>
    );
}