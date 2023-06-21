import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import useTodoQueryStore from "../store";
interface Props {
  onSearch: (searchText: string) => void;
}
const SearchInput = ({ onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const setSearchText = useTodoQueryStore((s) => s.setSearchText);

  const debouncedHandleInput = debounce((value) => {
    setSearchText(value);
  }, 5000); // delay in ms

  useEffect(() => {
    debouncedHandleInput(searchTerm);
  }, [searchTerm, debouncedHandleInput]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  return (
    <div className="form-control">
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered"
        onChange={handleInput}
      />
    </div>
  );
};

export default SearchInput;
