export interface AdminTextBoxProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  radioLabel?: string;
}

export const AdminInputBox = (props: AdminTextBoxProps) => {
  const { label, radioLabel, ...rest } = props;
  return (
    <label className={`flex items-center justify-between mb-4`}>
      {label && <span className="text-gray-700 text-xl pr-4">{label}</span>}
      <input
        className={
          "w-2/4 rounded-lg border-transparent appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent " +
          (props.className || "")
        }
        {...rest}
      />
      {rest.type === "radio" && <span className={`ml-3`}>{radioLabel}</span>}
    </label>
  );
};
