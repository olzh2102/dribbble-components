import { useState, useEffect } from 'react';

const useCurrentLocation = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (pos: any) => setCoordinates(pos.coords),
      console.error
    );
  }, []);

  return { coord: { lat: coordinates?.latitude, lon: coordinates?.longitude } };
};

export default useCurrentLocation;
