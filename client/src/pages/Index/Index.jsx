import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlaceImg from "../../components/Images/PlaceImg";

export default function Index(props) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/fetchPlaces").then((response) => {
      setPlaces([...response.data, ...response.data, ...response.data]);
      console.log(response.data);
    });
  }, []);

  return (
    <div className="grid gap-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-10">
      {places.length > 0 &&
        places.map((place) => (
          <Link
            to={"/place/" + place._id}
            key={place._id}
            className="rounded-xl"
          >
            <div className="rounded flex">
              {/* <PlaceImg place = {place} classname="rounded-2xl object-cover aspect-square" index = {0}/> */}
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

            <div className="ms-1">
              <div className="font-bold text-sm mt-3 mb-1">{place.address}</div>
              <div className="text-sm text-gray-500 truncate">
                {place.title}
              </div>
              <div className="font-bold text-sm flex items-center">
                <span className="text-base p-0 me-1">{"\u20B9"}</span>
                {place.price} per night
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
