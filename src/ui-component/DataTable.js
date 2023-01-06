import moment from "moment";

export default function TripsDataGrid({ isNoRecord, data }) {
  return (
    <>
      {isNoRecord ? (
        <>
          <div className="mx-auto max-w-7xl p-5 pb bg-white drop-shadow-xl rounded-xl">
            <section>
              <p className="text-lg mb-4 font-bold text-center w-full text-gray-800 dark:text-gray-300">
                No Record Found.
              </p>
            </section>
          </div>
        </>
      ) : null}
      {data.length > 0 ? (
        <div className="mx-auto max-w-7xl p-5 pb bg-white drop-shadow-xl rounded-xl">
          <section>
            <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.map((item) => {
                return (
                  <div
                    key={`port`}
                    className="my-8 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1"
                  >
                    <a href="#" className="cursor-pointer">
                      <figure>
                        <img
                            alt="ThumbNail"
                          src="./Images/airport-thumbnail.jpg"
                          className="rounded-t h-50 w-full object-cover"
                        />
                        <figcaption className="p-4">
                          <p className="text-lg mb-4 font-bold leading-relaxed text-gray-800 dark:text-gray-300">
                            {item.title}
                            <div className="text-sm text-white font-bold w-fit p-1 dark:text-gray-400 rounded-lg bg-indigo-400">
                              {item?.tripCategory?.name}
                            </div>
                          </p>
                          <p className="leading-5 text-md dark:text-gray-400">
                            {item?.company?.name}
                          </p>
                          <p className="leading-5 text-lg text-gray-500 dark:text-gray-400">
                            {item?.company?.email}
                          </p>
                          <p className="leading-5 text-xs text-gray-500 dark:text-gray-400">
                            {item?.integrationSource?.email}
                          </p>
                          <p class="text-gray-600 mt-3 text-xs">
                            {"Posted: "} {moment(item.postedDate).fromNow()}
                          </p>
                        </figcaption>
                      </figure>
                    </a>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
