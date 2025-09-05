import { useState } from "react";
import axios from "axios";

const geoapifyKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

export default function LocationInput({ label, value, setValue, setCoords }){

    const [ suggestions, setSuggestions ] = useState([]);

    const handleChange = async (e) => {
        
        const inputValue = e.target.value;
        setValue(inputValue);

        if( inputValue.length < 3 ){
            
            setSuggestions([]);
            return;

        }

        try {

            const res = await axios.get(
                `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
                    inputValue
                )}&apiKey=${geoapifyKey}`
            );
            setSuggestions(res.data.features || []);
        }   catch(err){
            console.error("Autocomplete error:", err);
        }
    };

    const handleSelect = (place) => {

        setValue(place.properties.formatted);
        setCoords([place.geometry.coordinates[1], place.geometry.coordinates[0]]);
        setSuggestions([]);

    };

    return (

        <div className="relative mb-4">
            <input 
                type="text" 
                placeholder={label}
                value={value}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-400 text-black"
            />

            {suggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 w-full rounded mt-1 z-10 max-h-48 overflow-y-auto">
                    {suggestions.map((place, i) => (
                        <li 
                            key={i}
                            onClick={() => handleSelect(place)}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                        >
                            {place.properties.formatted}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}