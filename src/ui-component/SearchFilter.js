import { useState } from "react";
import AutoComplete from "./AutoComplete";
import DatePicker from "./DatePicker";
import axios from "axios";

export default function SearchFilter({ onSearchCompleted }) {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    origin: "",
    destination: "",
    etd: "",
  });

  const onSearch = () => {
    setLoading(true);
    let queryString = '';
    if(filters.destination && filters.origin && filters.etd) {
        queryString = `?departureAirportId=${filters.origin}&arrivalAirpor=${filters.origin}&etd=${filters.etd}`;
    }
    axios
      .get(`https://dev.charterpad.com/serve/api/trip/search${queryString}`)
      .then((response) => {
        if (onSearchCompleted) {
          const { result } = response.data;
          console.log("Search result: ", result);
          const trips = result.trips ? result.trips : result;
          onSearchCompleted(trips);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("error on search", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
        Flight Search
      </h1>
      <p className="mt-6 text-lg mb-5 leading-8 text-gray-600 sm:text-center">
        To search flights please select origin and destination along with
        departure date
      </p>
      <div className="grid lg:grid-cols-3 gap-4">
        <div>
          <AutoComplete
            title={"Origin Airport"}
            onSelected={(data) => {
              setFilters({
                ...filters,
                origin: data.id,
              });
            }}
          />
        </div>
        <div>
          <AutoComplete
            title={"Destination Airport"}
            onSelected={(data) => {
              setFilters({
                ...filters,
                destination: data.id,
              });
            }}
          />
        </div>
        <div>
          <DatePicker
            title={"Departure Date"}
            onSelected={(date) => {
              setFilters({
                ...filters,
                etd: date,
              });
            }}
          />
        </div>
      </div>
      <div className="mt-8 flex gap-x-4 sm:justify-center">
        <button
          disabled={loading}
          onClick={onSearch}
          className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
        >
          {loading ? <span>Searching...</span> : <span>Search Flights</span>}
        </button>
      </div>
    </div>
  );
}
