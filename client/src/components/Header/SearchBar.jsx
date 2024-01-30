import axios from "axios";
import { useFormik } from "formik";
import {
  SearchBarInitialValues,
  SearchBarValidationSchema,
} from "../schemas/Validation";
import { useNavigate } from "react-router-dom";

function SearchBar({ visible, closeModal }) {
  const initialValues = SearchBarInitialValues;
  const validationSchema = SearchBarValidationSchema;
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      var emptySearch = true;
      var emptyCheck = Object.values(values);
      emptyCheck.forEach((element) => {
        if (element) emptySearch = false;
      });
      if (emptySearch) {
        resetForm();
        closeModal(false);
      } else {
        const searchResult = await axios.post("/fetch/places", values);
        if (searchResult.data.success) {
          resetForm();
          closeModal(false);
          navigate('/search/results', { state: { responseData: searchResult.data.result } });
        } else {
          closeModal(false);
        }
      }
    },
  });

  const handleCloseModal = (event) => {
    if (event.target.id == "container") closeModal(false);
  };

  if (!visible) return null;
  else
    return (
      <div
        id="container"
        onClick={handleCloseModal}
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div className="bg-white shadow p-4 rounded-2xl">
          <div className="border rounded-2xl mt-4">
            <div className="py-3 px-4">
              <label>Place:</label>
              <input
                type="text"
                value={values.place}
                placeholder="Which place are you looking for?"
                id="place"
                name="place"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.place && touched.place ? (
                <p className="text-primary py-1 px-3">{errors.place}</p>
              ) : null}
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="py-3 px-4">
                <label>Min Price:</label>
                <input
                  type="number"
                  value={values.minPrice}
                  id="minPrice"
                  name="minPrice"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.minPrice && touched.minPrice ? (
                  <p className="text-primary py-1">{errors.minPrice}</p>
                ) : null}
              </div>

              <div className="py-3 px-4 md:border-l sm:border-t md:border-t-0">
                <label>Max Price:</label>
                <input
                  type="number"
                  value={values.maxPrice}
                  id="maxPrice"
                  name="maxPrice"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.maxPrice && touched.maxPrice ? (
                  <p className="text-primary py-1">{errors.maxPrice}</p>
                ) : null}
              </div>
            </div>

            <div className="py-3 px-4 border-t">
              <label>Min number of guests:</label>
              <input
                type="number"
                value={values.numberOfGuests}
                id="numberOfGuests"
                name="numberOfGuests"
                min={1}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.numberOfGuests && touched.numberOfGuests ? (
                <p className="text-primary py-1 px-3">
                  {errors.numberOfGuests}
                </p>
              ) : null}
            </div>
          </div>
          <button onClick={handleSubmit} className="primary mt-4" type="submit">
            Search
          </button>
        </div>
      </div>
    );
}

export default SearchBar;
