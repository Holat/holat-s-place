import {
  GoogleMap,
  StandaloneSearchBox,
  Libraries,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState, useCallback } from "react";
import "./map.scss";
import { LocationType } from "../../types/types";

const libraries: Libraries = ["places", "geometry"];
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

interface UserPosition {
  lat: number;
  lng: number;
}

const defaultCenter: UserPosition = {
  lat: 6.5244,
  lng: 3.3792,
};

export default function Map({
  handleSetLocation,
}: {
  handleSetLocation: (place: LocationType) => void;
}) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAKKj0qdxXVnidSbvBEBZC5aQEcxciRJOs",
    libraries,
  });
  const [userPosition, setUserPosition] = useState<UserPosition>(defaultCenter);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);

  const handleLocateUser = () => {
    if (navigator.geolocation && isLoaded) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newUserPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          handleSetLocation({
            currentAddress: "Current Location",
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          setUserPosition(newUserPosition);

          if (map) {
            map.panTo(newUserPosition);
            map.setZoom(15);
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error(
        "Geolocation is not supported by this browser or the Google Maps API failed to load."
      );
    }
  };

  const handleLoad = useCallback((map: google.maps.Map | null) => {
    setMap(map);

    const input = document.getElementById(
      "search-box-input"
    ) as HTMLInputElement;
    const searchBox = new window.google.maps.places.SearchBox(input);
    setSearchBox(searchBox);

    searchBox.addListener("place_changed", () => {
      const places = searchBox.getPlaces();

      if (places && places.length > 0) {
        const selectedPlace = places[0];
        const newCenter = {
          lat: selectedPlace?.geometry?.location?.lat() || defaultCenter.lat,
          lng: selectedPlace?.geometry?.location?.lng() || defaultCenter.lng,
        };

        setUserPosition(newCenter);

        if (map) {
          map.panTo(newCenter);
          map.setZoom(15);
        }
      }
    });
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleOnPlaceChange = useCallback(async () => {
    await delay(100);
    if (searchBox) {
      const places = searchBox.getPlaces();

      if (places && places.length > 0) {
        const selectedPlace = places[0];
        const newCenter = {
          lat: selectedPlace?.geometry?.location?.lat() || defaultCenter.lat,
          lng: selectedPlace?.geometry?.location?.lng() || defaultCenter.lng,
        };

        handleSetLocation({
          currentAddress: selectedPlace.formatted_address || "Adg",
          lat: selectedPlace.geometry?.location?.lat() || defaultCenter.lat,
          lng: selectedPlace.geometry?.location?.lng() || defaultCenter.lng,
        });

        setUserPosition(newCenter);

        if (map) {
          map.panTo(newCenter);
          map.setZoom(15);
        }
      }
    } else {
      console.log("error loading");
    }
  }, [searchBox, handleSetLocation, map]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className="rMap">
      <div className="input">
        {isLoaded && (
          <StandaloneSearchBox onPlacesChanged={handleOnPlaceChange}>
            <input
              type="text"
              id="search-box-input"
              placeholder="Search for a location"
              onLoad={() => {}}
            />
          </StandaloneSearchBox>
        )}
      </div>
      <button className="locateBtn" onClick={handleLocateUser} title="locate">
        <img src="/icons/locate.svg" alt="locate" />
      </button>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={userPosition}
          onLoad={handleLoad}
          onUnmount={onUnmount}
          options={{
            disableDefaultUI: true,
          }}
        ></GoogleMap>
      )}
    </div>
  );
}
