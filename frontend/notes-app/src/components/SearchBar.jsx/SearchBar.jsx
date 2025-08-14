import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

function SearchBar({ value, onChange, handleSearch, onClearSearch }) {
  return (
    <div className="w-full max-w-sm flex items-center px-3 py-2 bg-slate-100 rounded-md sm:max-w-xs md:max-w-md">
      <input
        type="text"
        placeholder="Search Notes"
        className="flex-grow text-sm bg-transparent outline-none pr-2"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className="text-lg text-slate-500 cursor-pointer hover:text-black mr-2"
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className="text-slate-500 cursor-pointer hover:text-black text-sm"
        onClick={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
