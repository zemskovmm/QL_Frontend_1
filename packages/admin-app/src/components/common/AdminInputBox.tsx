enum variants {
  "basicStyle",
  "colStyle",
}

type variantType = {
  label: string;
  title: string;
  input: string;
};

const basicStyle = {
  label: "flex items-center justify-between mb-4",
  title: "text-gray-700 text-xl pr-4",
  input:
    "w-2/4 rounded-lg border-transparent appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent",
};

const colStyle = {
  label: "flex flex-col mb-4 w-full",
  title: "text-gray-700 pr-4 mb-2",
  input:
    " rounded-lg border-transparent appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent",
};

const StyleVariant = [basicStyle, colStyle];

export interface AdminTextBoxProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  radioLabel?: string;
  errors?: string[];
  variant?: variants;
}

export const AdminInputBox = (props: AdminTextBoxProps) => {
  const { label, radioLabel, ...rest } = props;
  const variant: variantType = props.variant ? StyleVariant[props.variant] : basicStyle;
  return (
    <label className={variant.label}>
      {label && <span className={variant.title}>{label}</span>}
      <input className={variant.input + " " + (props.className || "")} {...rest} />
      {rest.type === "radio" && <span className={`ml-3`}>{radioLabel}</span>}
      {props.errors && (
        <div className={`flex text-red-600`}>
          {props.errors?.map((el, i) => (
            <span key={`errors ${i} ${label}`}>{el}</span>
          ))}
        </div>
      )}
    </label>
  );
};
