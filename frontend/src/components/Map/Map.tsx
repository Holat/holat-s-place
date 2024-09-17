import React, { useEffect, useState } from "react";
import "./map.scss";
import {
  Map as GoogleMap,
  Pin,
  AdvancedMarker,
  APIProvider,
} from "@vis.gl/react-google-maps";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { LocationType } from "../../types/types";
import { locateIcon } from "../../assets/icons"

interface UserPosition {
  lat: number;
  lng: number;
}

const defaultCenter = {
  lat: 6.5244,
  lng: 3.3792,
};

export default function Map({
  handleSetLocation,
}: {
  handleSetLocation: (place: LocationType) => void;
}) {
  const [selected, setSelected] = useState<UserPosition | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  useEffect(() => {
    if (selected) {
      setMapCenter(selected);
    }
  }, [selected]);

  return (
    <div className="rMap">
      <div className="input">
        {isLoaded && (
          <PlacesAutocomplete
            setSelected={setSelected}
            handleSetLocation={handleSetLocation}
          />
        )}
      </div>
      {/* onClick={handleLocateUser} */}
      <button className="locateBtn" title="locate">
        <img src={ locateIcon } alt="locate" />
      </button>
      <APIProvider
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
        onLoad={() => setIsLoaded(true)}
      >
        <GoogleMap
          disableDefaultUI={true}
          defaultZoom={20}
          center={mapCenter}
          mapId={import.meta.env.VITE_MAP_ID}
        >
          {selected && (
            <AdvancedMarker position={selected}>
              <Pin
                background={"white"}
                borderColor={"#FA6400"}
                glyphColor={"#FA6400"}
              />
            </AdvancedMarker>
          )}
        </GoogleMap>
      </APIProvider>
    </div>
  );
}

const PlacesAutocomplete = ({
  setSelected,
  handleSetLocation,
}: {
  setSelected: React.Dispatch<React.SetStateAction<null | UserPosition>>;
  handleSetLocation: (place: LocationType) => void;
}) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    handleSetLocation({
      lat,
      lng,
      currentAddress: results[0].formatted_address,
    });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
