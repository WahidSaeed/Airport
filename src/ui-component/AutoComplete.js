import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import axios from "axios";

export default function AutoComplete({ title, onSelected }) {
  const [selected, setSelected] = useState({});
  const [query, setQuery] = useState("");
  const [airports, setAirPorts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAirports = () => {
    setLoading(true);
    axios
      .get(`https://dev.charterpad.com/serve/api/airport/${query}/keyword`)
      .then((response) => {
        setLoading(false);
        setAirPorts(response.data.result);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (query.length >= 3) {
      getAirports();
    }
    else {
      setAirPorts([]);
    }

  }, [query]);

  useEffect(() => {
    if(onSelected) {
        onSelected(selected);
    }
  }, [selected])

  return (
    <Combobox value={selected} onChange={setSelected}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        {title}
      </Combobox.Label>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-0 pl-3 pr-10 text-sm text-gray-900 focus:ring-0 outline-none"
            displayValue={(airport) => airport.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {loading ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Loading...
              </div>
            ) : null}
            {airports.length === 0 && !loading ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              airports.map((airport) => (
                <Combobox.Option
                  key={airport.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-teal-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={airport}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {airport.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
