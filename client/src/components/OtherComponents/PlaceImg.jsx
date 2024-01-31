export default function PlaceImg({ place, index = 0, classname }) {
  if (!place.photos.length) return "";

  if (!classname) classname = "object-cover";

  return (
    <img
      className={classname}
      src={place.photos[index].includes("https://") ? place.photos[index] : `http://localhost:4000/uploads/` + place.photos[index]}
      alt=""
    />
  );
}
