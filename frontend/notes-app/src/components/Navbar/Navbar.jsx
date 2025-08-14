import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar.jsx/SearchBar";
import { MdClose } from "react-icons/md";
import { getInitials } from "../../utils/helper";

function Navbar({ userInfo, onSearchNote, handleClearSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="bg-white w-full px-4 py-3 shadow">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/dashboard">
          <h2 className="text-xl font-semibold text-black">Notes</h2>
        </Link>

        {/* Middle: Search bar (desktop only) */}
        <div className="hidden md:block w-full max-w-md mx-6">
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Search icon (mobile only) */}
          {showMobileSearch ? (
            <MdClose
              className="text-2xl text-slate-600 cursor-pointer md:hidden"
              onClick={() => setShowMobileSearch((prev) => !prev)}
            />
          ) : (
            <FaMagnifyingGlass
              className="text-xl text-slate-600 cursor-pointer md:hidden"
              onClick={() => setShowMobileSearch((prev) => !prev)}
            />
          )}

          {/* Profile initials */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full text-slate-950 font-semibold bg-slate-100">
            {getInitials(userInfo?.fullName)}
          </div>

          {/* Name and Logout (desktop only) */}
          <div className="hidden md:flex items-center gap-2">
            <p className="text-sm font-medium">{userInfo?.fullName}</p>
            <button
              className="text-sm text-slate-500 underline font-medium cursor-pointer"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>

          {/* Logout (mobile only) */}
          <button
            className="md:hidden text-sm text-slate-500 underline font-medium cursor-pointer"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile search bar below navbar */}
      {showMobileSearch && (
        <div className="mt-2 md:hidden w-full px-2">
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
        </div>
      )}
    </div>
  );
}

export default Navbar;
