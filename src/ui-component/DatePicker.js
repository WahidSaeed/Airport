export default function DatePicker({ title, onSelected }) {

  const onDateSelect = (event) => {
    const value = event.target.value;
    onSelected(value);
  };

  return (
    <>
      <div className="block text-sm font-medium text-gray-700">{title}</div>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
          <span className="flex items-center w-full">
            <input
              onChange={onDateSelect}
              className="w-full outline-none"
              type={"date"}
            />
          </span>
        </div>
      </div>
    </>
  );
}
