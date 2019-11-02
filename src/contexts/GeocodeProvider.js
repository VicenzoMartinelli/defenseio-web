import Geocode from "react-geocode";
import React, { useMemo, createContext } from "react";

export const GeocodeContext = createContext(Geocode);

const GeocodeProvider = props => {
  useMemo(() => {
    Geocode.setApiKey(process.env.REACT_APP_GEOCODE_API_KEY);
    Geocode.setLanguage("pt-BR");
    Geocode.setRegion("br");
    Geocode.enableDebug();
  }, []);

  return (
    <GeocodeContext.Provider value={Geocode}>
      {props.children}
    </GeocodeContext.Provider>
  );
};

export default GeocodeProvider;
