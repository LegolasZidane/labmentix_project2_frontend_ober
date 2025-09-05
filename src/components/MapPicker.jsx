import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const geoapifyKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function MapPicker({ originCoords, destinationCoords }){

    return (
            <MapContainer
                center={[28.6139, 77.2090]} // Default: New Delhi
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
                </MapContainer>
    );
}