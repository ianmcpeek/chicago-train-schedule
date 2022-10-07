class Record {
    public readonly id: string;
    public train: string;
    public route: string;
    public routeNumber: string;
    public operatorId: string;
    
    constructor(
        id: string,
        train: string,
        route: string,
        routeNumber: string,
        operatorId: string
    ) {
        this.id = id;
        this.train = train;
        this.route = route;
        this.routeNumber = routeNumber;
        this.operatorId = operatorId;
    }
}

export default Record;