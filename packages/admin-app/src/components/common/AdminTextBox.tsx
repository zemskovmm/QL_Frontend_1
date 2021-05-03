


export interface AdminTextBoxProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
{
  id: string;
  label: string;
}

export const AdminTextBox = (props: AdminTextBoxProps) => {
  const {label, id, ...rest} = props;
  return <div className=" relative ">
    <label htmlFor={id} className="text-gray-700">
      {label}
    </label>
    <input type="text" id={id}
           className={"rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent "+ (props.className || "")}
      {...rest}/>
  </div>

}
