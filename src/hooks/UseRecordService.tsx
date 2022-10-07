import { useCallback } from "react";
import { useEffect, useRef, useState } from "react";
import RecordForm from "../forms/RecordForm";
import Record from "../models/Record";
import CacheClient from "../services/CacheClient";
import RecordService from "../services/RecordService";

// TODO: Extend into configuration to support dropdown of page sizes
const PAGE_SIZE = 5;

/**
 * Provides one place to handle paginated, sorted record data
 * 
 * @returns {
 *       records,
 *       paginatedLabel,
 *       sortColumn,
 *       sortDescending,
 *       createRecord,
 *       updateRecord,
 *       deleteRecord,
 *       prevPage,
 *       nextPage,
 *       setSortColumn,
 *       setSortDescending
 * }
 */
function useRecordService() {
    const [records, setRecords] = useState<Record[]>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [paginatedLabel, setPaginatedLabel] = useState('');
    const [sortColumn, setSortColumn] = useState('routeNumber');
    const [sortDescending, setSortDescending] = useState(true);
    const [recordsChanged, setRecordsChanged] = useState(0);

    const createRecord = useCallback((form: RecordForm) => {
        const cacheClient = new CacheClient();
        const recordService = new RecordService(cacheClient);
        recordService.create(form.train, form.route, form.routeNumber, form.operatorId);
        setRecordsChanged(recordsChanged + 1);
    }, [recordsChanged]);
    
    const updateRecord = useCallback((recordId: string, form: RecordForm) => {
        const cacheClient = new CacheClient();
        const recordService = new RecordService(cacheClient);
        recordService.update(recordId, form.train, form.route, form.routeNumber, form.operatorId);
        setRecordsChanged(recordsChanged + 1);
    }, [recordsChanged]);

    const deleteRecord = useCallback((recordId: string) => {
        const cacheClient = new CacheClient();
        const recordService = new RecordService(cacheClient);
        recordService.delete(recordId);
        setRecordsChanged(recordsChanged + 1);
    }, [recordsChanged]);

    const prevPage = useCallback(() => {
        if (pageIndex > 0) {
            setPageIndex(pageIndex - 1);
        }
    }, [pageIndex]);

    const nextPage = useCallback(() => {
        const cacheClient = new CacheClient();
        const recordService = new RecordService(cacheClient);
        if (recordService.hasPage(pageIndex + 1, PAGE_SIZE)) {
            setPageIndex(pageIndex + 1);
        }
    }, [pageIndex]);

    useEffect(() => {
        const cacheClient = new CacheClient();
        const recordService = new RecordService(cacheClient);
        
        setRecords(recordService.getPaginated(pageIndex, PAGE_SIZE, sortColumn, sortDescending));
    }, [pageIndex, sortColumn, sortDescending, recordsChanged]);

    useEffect(() => {
        const cacheClient = new CacheClient();
        const recordService = new RecordService(cacheClient);
        const count = recordService.getRecordCount();
        const range = [
            pageIndex*PAGE_SIZE + 1,
            pageIndex*PAGE_SIZE + Math.min(PAGE_SIZE, count - pageIndex*PAGE_SIZE)
        ];

        setPaginatedLabel(`showing ${range[0]} - ${range[1]} of ${count}`);
    }, [pageIndex, recordsChanged]);

    return {
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
    };
}

export default useRecordService;