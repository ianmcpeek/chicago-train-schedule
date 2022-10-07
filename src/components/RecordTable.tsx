import Record from "../models/Record";
import './RecordTable.css';

interface RecordTableProps {
    records: Record[];
    paginatedLabel: string;
    sortColumn: string;
    sortDescending: boolean;
    fnOnEdit: (record: Record) => void;
    fnOnDelete: (record: Record) => void;
    fnOnSort: (field: string, descending: boolean) => void;
    fnOnNextPage: () => void;
    fnOnPrevPage: () => void;
}

function SortEmoji({ selected, descending }: { selected: boolean, descending: boolean}) {
    return <span className='sort-emoji'>
    {
        selected ? (descending ? '🡇' : '🡅') : '' 
    }
    </span>;
}

// include zero state for application on first load
function RecordTable({ records, paginatedLabel, sortColumn, sortDescending, fnOnEdit, fnOnDelete, fnOnSort, fnOnPrevPage, fnOnNextPage }: RecordTableProps) {

    function onSort(field: string) {
        // same column clicked again, toggle sort order
        if (field === sortColumn) {
            fnOnSort(field, !sortDescending);
        // new sort column, reset order
        } else {
            fnOnSort(field, true);
        }
    }

    return (
        records.length === 0 ?
        <div className='zero-state'>No Schedules have been created.</div> :
        <table className="record-table">
            <thead>
                <tr>
                    <th className='sortable' onClick={() => onSort('train')}>
                        Train <SortEmoji selected={sortColumn==='train'} descending={sortDescending}></SortEmoji>
                    </th>
                    <th className='sortable' onClick={() => onSort('route')}>
                        Route <SortEmoji selected={sortColumn==='route'} descending={sortDescending}></SortEmoji>
                    </th>
                    <th className='sortable' onClick={() => onSort('routeNumber')}>
                        Route Number <SortEmoji selected={sortColumn==='routeNumber'} descending={sortDescending}></SortEmoji>
                    </th>
                    <th className='sortable' onClick={() => onSort('operatorId')}>
                        Operator Id <SortEmoji selected={sortColumn==='operatorId'} descending={sortDescending}></SortEmoji>
                    </th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    records.map(record => {
                        return (
                            <tr key={record.id}>
                                <td>{record.train}</td>
                                <td>{record.route}</td>
                                <td>{record.routeNumber}</td>
                                <td>{record.operatorId}</td>
                                <td><button className='edit-button' onClick={() => { fnOnEdit({ ...record }) }}>✏</button></td>
                                <td><button className='delete-button' onClick={() => { fnOnDelete({ ...record }) }}>🗑</button></td>
                            </tr>
                        );
                    })
                }
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={6}>
                        <div className='record-table__footer'>
                            {paginatedLabel} 
                            <button onClick={fnOnPrevPage}>{'<'}</button>
                            <button onClick={fnOnNextPage}>{'>'}</button>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    );
}

export default RecordTable;