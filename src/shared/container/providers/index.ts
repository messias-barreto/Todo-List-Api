import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DaysjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";


container.registerSingleton<IDateProvider>(
    "DaysDateProvider",
    DaysjsDateProvider
)