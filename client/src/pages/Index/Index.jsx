import axios from "axios";
import { useEffect, useState } from "react";

export default function Index(props) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/fetchPlaces").then((response) => {
      setPlaces([...response.data, ...response.data, ...response.data]);
      // console.log();
    });
  }, []);

  return (
    <div className="grid gap-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-10">
      {places.length > 0 &&
        places.map((place) => (
          <div key={place._id} className="rounded-xl">
            <div className="rounded flex">
              {place.photos ? (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                  alt=""
                />
              ) : (
                ""
              )}
            </div>

            <div className="font-bold text-sm mt-3 mb-1">{place.title}</div>
            <div className="text-sm text-gray-500">{place.address}</div>
          </div>
        ))}
    </div>
  );
}
