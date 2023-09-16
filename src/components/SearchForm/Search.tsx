import React, { useState } from "react";
import Image from "next/image";

interface SearchFormProps {
  onSearch: (searchTerm: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className=" border w-[525px] text-white h-[36px] rounded-[6px] bg-transparent placeholder:text-white "
        type="text"
        placeholder="what do you want to watch?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Image
        src="/icons/search.svg"
        alt="tomatoes"
        width={16}
        height={17}
        className="absolute top-4 ml-[31rem]"
      />
    </form>
  );
};

export default SearchForm;
