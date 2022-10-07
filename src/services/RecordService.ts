import Record from "../models/Record";
import CacheClient from "./CacheClient";
import { v4 as uuidv4 } from 'uuid';

/**
 * Service for interacting with records stored in the browser's localStorage
 * Main strategy is to fetch all records from storage when performing changes.
 * On a larger scale we could add chunking if the number of records in one key-value pair becomes unwieldy.
 */
class RecordService {
    private cacheClient: CacheClient;
    private static TAG = 'chicago-train-schedules-records';

    constructor(cacheClient: CacheClient) {
        this.cacheClient = cacheClient;
    }

    getAll(): Record[] {
        let records: Record[] = this.cacheClient.get(RecordService.TAG);
        if (records === null) {
            records = [];
            this.cacheClient.set(RecordService.TAG, records);
        }

        return records;
    }

    getPaginated(pageIndex: number, pageSize: number, sortField: string, sortDescending: boolean): Record[] {
        let records: Record[] = this.cacheClient.get(RecordService.TAG);
        if (records === null) {
            records = [];
            this.cacheClient.set(RecordService.TAG, records);
        }
        // sorting
        records = this.sortRecords(records, sortField, sortDescending);

        // pagination
        const start = pageIndex * pageSize;
        records = records.slice(start, start + pageSize < records.length ? start + pageSize : undefined);

        return records;
    }

    hasPage(pageIndex: number, pageSize: number) {
        const records = this.getAll();
        return pageIndex * pageSize < records.length;
    }
    getRecordCount() {
        const records = this.getAll();
        return records.length;
    }

    create(train: string, route: string, routeNumber: string, operatorId: string): void {
        const records = this.getAll();
        const record = new Record(uuidv4(), train, route, routeNumber, operatorId);
        records.push(record);
        this.store(records);
    }
    
    update(recordId: string, train: string, route: string, routeNumber: string, operatorId: string): void {
        const records = this.getAll();
        const index = records.findIndex(record => record.id === recordId);
        if (index !== -1) {
            const record = records[index];
            record.train = train;
            record.route = route;
            record.routeNumber = routeNumber;
            record.operatorId = operatorId;
        }
        this.store(records);
    }

    delete(recordId: string) {
        let records = this.getAll();
        records = records.filter(record => record.id !== recordId);
        this.store(records);
    }

    store(records: Record[]): void {
        this.cacheClient.set(RecordService.TAG, records);
    }

    private sortRecords(records: any[], field: string, descending: boolean): any[] {
        const sortedRecords = [...records];
        // for our purposes all fields are strings
        // out of convenience this general purpose function can be used for all sort field
        // in realworld we would need to handle numerous differe sort strategies
        sortedRecords.sort((a, b) =>  descending ? b[field].localeCompare(a[field]) : a[field].localeCompare(b[field]));
        return sortedRecords;
    }
}

export default RecordService;