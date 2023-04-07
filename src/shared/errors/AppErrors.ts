export class AppErrors {
    public readonly message: string;
    public readonly statuscode: number;

    constructor(message: string, statuscode = 409){
        this.message = message;
        this.statuscode = statuscode;
    }
}