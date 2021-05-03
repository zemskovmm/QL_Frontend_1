interface ITableColumn<T> {
    header: string,
    id: string,
    renderer: (row: T) => JSX.Element | string | number
}

interface ITableProps<T> {
    columns: ITableColumn<T>[];
    rows: T[],
    idGetter: (row: T) => string
}

export const AdminTable = <T, >(props: ITableProps<T>) => {
    return <table className="min-w-full leading-normal">
        <thead>
        {props.columns.map(col => <th
            id={col.id}
            scope="col"
            className="font-bold px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
            {col.header}
        </th>)}
        </thead>
        <tbody>
        {props.rows.map(row => <tr id={props.idGetter(row)}>
            {props.columns.map(col => <td
                className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {col.renderer(row)}
            </td>)}
        </tr>)}
        </tbody>
    </table>
}
