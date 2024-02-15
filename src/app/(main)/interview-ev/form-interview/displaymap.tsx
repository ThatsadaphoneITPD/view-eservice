import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
interface Props {
    lat: any, lng: any
}
const containerStyle = {
    width: '100%',
    height: '150px',
    borderRadius: '5px',
};

const GoogleMapShow = (props: Props) => {
    const google_key_api = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: google_key_api as string,
    });
    const handleMapLoad = (map: any) => {
        map.setOptions({
            enableMyLocation: true,
        });
    };
    return (
        <div>
            {isLoaded ? (
                <div>
                    <div >
                        {parseFloat(props.lng).toFixed(6) + "," + parseFloat(props.lng).toFixed(6)}
                    </div>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }}
                        zoom={15}
                        onLoad={handleMapLoad} // Set the onLoad callback
                    >
                        <Marker
                            position={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }}
                        />
                    </GoogleMap>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default GoogleMapShow;
