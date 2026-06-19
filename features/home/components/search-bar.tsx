import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";

const initialValue = "Search contacts or the web...";

interface Props {}

const Searchbar: NextPage<Props> = () => {
  const [value, setValue] = useState(initialValue);
  const [isReset, setIsReset] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputClick = () => {
    setIsReset(true);
    setValue("");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsReset(false);
      setValue(initialValue);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <input
      className="p-1.5 border border-[#6b8fa35d] rounded-[4px] w-full searchbar bg-white text-[#6b8fa3] bg-opacity-35 pl-4"
      ref={inputRef}
      type="text"
      value={isReset ? "" : value}
      onClick={handleInputClick}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Searchbar;
