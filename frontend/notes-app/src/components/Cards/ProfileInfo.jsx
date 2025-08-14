import { useState, useRef, useEffect } from "react";
import { getInitials } from "../../utils/helper";

function ProfileInfo({ userInfo, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center gap-3" ref={dropdownRef}>
      {/* Avatar */}
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 text-sm sm:text-base cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getInitials(userInfo?.fullName)}
      </div>

      {/* Username only visible on sm and above */}
      <p className="text-sm font-medium hidden sm:block">
        {userInfo?.fullName}
      </p>

      {/* Logout button only on sm and above */}
      <button
        className="text-sm text-slate-700 underline cursor-pointer hidden sm:block"
        onClick={onLogout}
      >
        Logout
      </button>

      {/* Dropdown for mobile (xs) */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-md z-50 p-3 sm:hidden">
          <p className="text-sm font-medium text-slate-800 mb-2">
            {userInfo?.fullName}
          </p>
          <button
            className="text-sm text-red-600 hover:underline"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileInfo;
