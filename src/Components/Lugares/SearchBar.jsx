import React, { useState, useCallback } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearchSubmit }) => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchText(value);
      if (onSearchSubmit) onSearchSubmit(value);
    },
    [onSearchSubmit],
  );

  return (
    <div className="bg-white p-3 md:p-4 rounded-[30px] md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-3 w-full max-w-5xl border border-gray-100 transition-all hover:shadow-[#20A217]/10 relative z-50">
      <div className="relative flex-grow w-full">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Buscar por nombre o descripción..."
          className="w-full pl-14 pr-4 py-4 rounded-full bg-gray-50 border-none focus:ring-2 focus:ring-[#20A217] outline-none text-gray-700 font-medium transition-all"
          value={searchText}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
