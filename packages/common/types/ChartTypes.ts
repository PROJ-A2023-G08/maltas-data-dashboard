export type Measurement = {
    measurement_id: number;
    device_id: number;
    role_id: 0 | 1 | 2;
    start_time_iso: string; // ISO 8601
    end_time_iso: string; // ISO 8601
    total_time_spent: number;
    status: 'COMPLETE' | 'CONTINUED' | 'INTERRUPTED' | 'STARTED' | 'PAUSED';
}

export type StackedComplianceChart = {
    month: string;
} & RoleCount;

export type RoleCount = {
    0: number;
    1: number;
    2: number;
}
