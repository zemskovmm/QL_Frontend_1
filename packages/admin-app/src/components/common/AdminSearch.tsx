import { useState } from "react";

export const AdminSearch = (props: { search: string; action: (s: string) => void }) => {
  const [searchString, setSearchString] = useState(props.search);

  return (
    <div className={`flex flex-col`}>
      <label className={`flex items-center`}>
        <input
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          type="text"
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              props.action(searchString);
            }
          }}
          className={`border-2 border-black`}
          // do something here [enter pressed]
        />
        <button
          onClick={() => {
            props.action(searchString);
          }}
          className={`text-white font-bold py-2 px-4 ml-2 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
        >
          Search
        </button>
      </label>
    </div>
  );
};
