export type Measurement = {
    measurement_id: number; // PK
    device_id: number; // FK
    role_id: 0 | 1 | 2; // FK
    start_time_iso: string; // ISO 8601
    end_time_iso: string; // ISO 8601
    total_time_spent: number;
    status: Status
  };
  
  export enum Status {
      COMPLETE = "COMPLETE",
      CONTINUED = "CONTINUED",
      INTERRUPTED = "INTERRUPTED",
      STARTED = "STARTED",
      PAUSED = "PAUSED",
  }
  
  export type Device = {
    device_id: number; // PK
    hospital_id: number; // FK
    unit: number;
    room: number;
  };
  
  export type Hospital = {
      hospital_id: number; // PK
      name: string;
  }
  
  export type Role = {
    role_id: 0 | 1 | 2;
    role_name: string;
  };
  
  export type User = {
      user_id: number; // PK
      hospital_id: number; // FK
      first_name: string;
      last_name: string;
      email: string;
      role_id: 0 | 1 | 2; // FK
  }