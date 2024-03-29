import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlaceImg from "../../components/OtherComponents/PlaceImg";

export default function Index(props) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/fetchPlaces").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  if (!places.length)
    return (
      <div className="px-25 py-14 mt-10 text-xl text-center text-gray-500">
        Loading...
      </div>
    );

  return (
    <div className="grid gap-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-20 py-14">
      {places.length > 0 &&
        places.map((place) => (
          <Link
            to={"/place/" + place._id}
            key={place._id}
            className="rounded-xl"
          >
            <div className="rounded flex">
              <PlaceImg
                place={place}
                classname="rounded-2xl object-cover aspect-square"
                index={0}
              />
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
