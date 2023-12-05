import { ChartData } from "@/types/chartData";
import { FilterTypes } from "@/types/filterTypes";
import { Measurement } from "@maltas-dashboard/common/types/Types";
import getWeek from "date-fns/getWeek";

type OmittedMeasurement = Omit<Measurement, "end_time_iso" | "status" | "role_id" | "device_id" | "measurement_id">;


export const calculateAverage = (role: OmittedMeasurement[], filter: FilterTypes): ChartData[] => {
    const averageRole: ChartData[] = [];
    let date: string;

    role.forEach((item) => {
        switch (filter) {
            case FilterTypes.DAILY:
                date = new Date(item.start_time_iso).toLocaleDateString();
                break;
            case FilterTypes.WEEKLY:
                date = getWeek(new Date(item.start_time_iso)).toString();
                break;
            case FilterTypes.MONTHLY:
                date = (new Date(item.start_time_iso).getMonth() + 1).toString();
                break;
            default:
                date = new Date(item.start_time_iso).toLocaleDateString();
                break;
        }
        const index = averageRole.findIndex((item) => item.x === date);
        if (index !== -1) {
            averageRole[index].y = Math.floor((averageRole[index].y + item.total_time_spent) / 2);
        } else {
            averageRole.push({ x: date, y: item.total_time_spent });
        }
    });

    return averageRole;
};