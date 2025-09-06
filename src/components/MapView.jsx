import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";
import axios from "axios";

const geoapifyKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function MapView({ originCoords, destinationCoords }){

    const [ route, setRoute ] = useState(null);

    useEffect(() => {

        const fetchRoute = async () => {

            if( !originCoords || !destinationCoords ) return;

            const url = `https://api.geoapify.com/v1/routing?waypoints=${originCoords[0]},${originCoords[1]}|${destinationCoords[0]},${destinationCoords[1]}&mode=drive&apiKey=${geoapifyKey}`;

            const response = await axios.get(url);
            const data = response.data;

            if( data.features && data.features.length > 0 ){
                
                const coords = data.features[0].geometry.coordinates[0].map((c) => [
                    c[1],//lat
                    c[0]
                ]);
                setRoute(coords);
            }
        };

        fetchRoute();
    }, [originCoords, destinationCoords]);

    return (
        <div className="relative h-full w-full">
            <MapContainer
                center={originCoords || [17.3850, 78.4867]} // Default: New Delhi
                zoom={12}
                style={{ height: "100%", width: "100%"}}
            >
                <TileLayer
                    url={`https://maps.geoapify.com/v1/tile/dark-matter/{z}/{x}/{y}.png?apiKey=${geoapifyKey}`}
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors'
                />

                {originCoords && (
                    <Marker position={originCoords}>
                        <Popup>Pickup</Popup>
                    </Marker>
                )}

                {destinationCoords && (
                    <Marker position={destinationCoords}>
                        <Popup>Dropoff</Popup>
                    </Marker>
                )}

                {route && (
                    <Polyline positions={route} pathOptions={{color: "white", weight: 5}} />
                )}
            </MapContainer>
        </div>
    );
}