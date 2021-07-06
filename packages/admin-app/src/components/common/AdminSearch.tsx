import { useThrottle } from "../../utils/throttle-effect";

export const AdminSearch = (props: {
  searchQuery: string;
  searchLang: string;
  action: () => Promise<void>;
  findCount: number;
}) => {
  useThrottle({ action: () => props.action(), timeout: 300, data: null }, [props.searchQuery, props.searchLang]);
  return (
    <div className={`flex flex-col`}>
      <label className={`flex`}>
        <div className={`mr-4`}>Search:</div>
        <input
          value={props.searchQuery}
          onChange={(e) => (props.searchQuery = e.target.value)}
          type="text"
          className={`border-2 border-black`}
        />
        <select onChange={(e) => (props.searchLang = e.target.value)} value={props.searchLang}>
          <option value="en">en</option>
          <option value="ru">rus</option>
          <option value="fr">fr</option>
          <option value="cn">cn</option>
          <option value="esp">esp</option>
        </select>
      </label>
      <div className={`flex`}>Find: {props.findCount}</div>
    </div>
  );
};
