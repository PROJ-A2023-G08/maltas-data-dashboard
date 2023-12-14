import { Measurement } from "@maltas-dashboard/common/types/Types";

export interface GetMeasurement {
    results: {
        data: Measurement[];
        errors: any[];
        meta: any;
    };
}
