import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
function PasswordInput({ value, onChange, placeholder }) {
  const [isShowPwd, setIsShowPwd] = useState(false);
  const toggleShowPwd = () => {
    setIsShowPwd(!isShowPwd);
  };
  return (
    <div className="flex items-center bg-transparent border-[1.5px] border-gray-300 px-5 rounded mb-3">
      <input
        value={value}
        onChange={onChange}
        type={isShowPwd ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 border-gray-300 rounded outline-none"
      />
      {isShowPwd ? (
        <FaRegEye
          size={22}
          className="text-blue-500 cursor-pointer"
          onClick={() => toggleShowPwd()}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-slate-500 cursor-pointer"
          onClick={() => toggleShowPwd()}
        />
      )}
    </div>
  );
}

export default PasswordInput;
