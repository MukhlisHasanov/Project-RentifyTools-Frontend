//v141124  import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
//v141124  import { fetchAdverts } from "redux/thunks";
//v141124  import { RootState } from "redux/store";

//v141124    const MyAdvert: React.FC = () => {
//v141124      const dispatch = useDispatch();
//v141124  const { adverts, loading, error } = useSelector((state: RootState) => state.advert);

//v141124  useEffect(() => {
//v141124    dispatch(fetchAdverts());
//v141124  }, [dispatch]);

//v141124  if (loading) return <p>Laden...</p>;
//v141124  if (error) return <p>Fehler: {error}</p>;

//v141124  return (
//v141124      <div>
//v141124        <h1>Meine Anzeigen</h1>
//v141124        {adverts.map((advert) => (
//v141124          <div key={advert.id}>
//v141124            <h2>{advert.title}</h2>
//v141124            <p>{advert.description}</p>
//v141124          </div>
//v141124        ))}
//v141124      </div>
//v141124    )
//v141124  };

//v141124  export default MyAdvert;


import React, { useEffect, useState } from "react"


const mockAdverts = [
  { id: 1, title: "Anzeige 1", description: "Beschreibung der Anzeige 1" },
  { id: 2, title: "Anzeige 2", description: "Beschreibung der Anzeige 2" },
  { id: 3, title: "Anzeige 3", description: "Beschreibung der Anzeige 3" },
]

const MyAdvert: React.FC = () => {
  const [adverts, setAdverts] = useState(mockAdverts)

  //v141124text Effekt für spätere API-Aufrufe 
  useEffect(() => {
    //v141124text Hier könnte ein API-Aufruf 
  }, [])

  return (
    <div>
      <h1>Meine Anzeigen</h1>
      {adverts.map(advert => (
        <div
          key={advert.id}
          style={{
            marginBottom: "10px",
            padding: "10px",
            border: "1px solid #ddd",
          }}
        >
          <h2>{advert.title}</h2>
          <p>{advert.description}</p>
        </div>
      ))}
    </div>
  )
}

export default MyAdvert
