import React, { useState } from 'react';
import RecordModal from '../components/RecordModal';
import RecordTable from "../components/RecordTable";
import RecordForm from '../forms/RecordForm';
import useRecordService from "../hooks/UseRecordService";
import Record from '../models/Record';
import './ViewRecord.css';


function ViewRecord() {
    const {
        records,
        paginatedLabel,
        sortColumn,
        sortDescending,
        createRecord,
        updateRecord,
        deleteRecord,
        prevPage,
        nextPage,
        setSortColumn,
        setSortDescending
    } = useRecordService();

    const [open, setOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<Record | null>(null);

    function onRecordCreated(form: RecordForm) {
        if (editingRecord === null) {
            createRecord(form);
        } else {
            updateRecord(editingRecord.id, form);
        }
        onModalClose();
    }

    function onEditRecord(record: Record) {
        setEditingRecord(record);
        openModal();
    }

    function onDeleteRecord(record: Record) {
        deleteRecord(record.id);
    }

    function onSortByField(field: string, descending: boolean) {
        setSortColumn(field);
        setSortDescending(descending);
    }

    function openModal() {
        setOpen(true);
    }

    function onModalClose() {        
        setEditingRecord(null);
        setOpen(false);
    }

    return (
        <div className='view-record'>
            <div className="view-record--content">
                <h1>Chicago Train Schedule</h1>
                <div className='row'>
                    <button className='create-button' onClick={openModal}>Create New +</button>
                </div>
                <RecordTable
                    records={records}
                    paginatedLabel={paginatedLabel}
                    sortColumn={sortColumn}
                    sortDescending={sortDescending}
                    fnOnEdit={onEditRecord}
                    fnOnDelete={onDeleteRecord}
                    fnOnSort={onSortByField}
                    fnOnNextPage={nextPage}
                    fnOnPrevPage={prevPage}
                ></RecordTable>
                <RecordModal
                    open={open}
                    editRecord={editingRecord}
                    fnOnCreate={onRecordCreated}
                    fnOnClose={onModalClose}
                ></RecordModal>
            </div>
        </div>
    );
}

export default ViewRecord;