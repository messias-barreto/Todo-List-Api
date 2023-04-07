import { AppErrors } from './../../errors/AppErrors';
import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { AppDataSource } from "../../../database/typeorm/data-source";
import { router } from "./routes";
import "../../container";


const data_source = AppDataSource.initialize().then(() => {
    const app = express();
    app.use(express.json());
    app.use(router);

    app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
        if(err instanceof AppErrors) {
            return response.status(err.statuscode).json({ message: err.message });
        }

        return response.status(500).json({ status: "error", message:  `Internal server Error - ${err.message}`})
    })

    app.listen(3300, () => console.log("Server is running in the port 3300"))
})
.catch((err) => {
    console.error("Does not possible initialization Data Source");
})

export { data_source }