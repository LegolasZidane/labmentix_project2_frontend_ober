import { UserButton } from "@clerk/clerk-react";
import MapPicker from "./MapPicker";

export default function Dashboard(){
    return (

        <div className="h-screen flex bg-white text-black">

            <div className="w-1/3 flex flex-col justify-between p-6 border-r border-gray-800 bg-white">
                
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold tracking-wide">OBER</h1>
                    <UserButton />
                </div>

                <div className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Pickup Location"
                        className="w-full px-4 py-3 rounded-lg text-black"
                    />
                    <input 
                        type="text" 
                        placeholder="Dropoff Location"
                        className="w-full px-4 py-3 rounded-lg text-black"
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
                <MapPicker />
            </div>
        </div>
    );
}