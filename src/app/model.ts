export interface Connection {
  connId: string;
}

export interface Location {
  id: number;
  name: string;
  image_data: string;
}

export interface Device {
  id: number;
  rtu_address: string;
  device_address: string;
  schema: string;
  point_data: Object;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  image_path: string;
  display_points: DisplayPoint[];
  alarms: Alarm[];
}

export interface DisplayPoint {
  id: number;
  name: string;
}

export interface Alarm {
  id: number;
  device: Device;
  name: string;
  point: string;
  compare: string;
  value: string;
  is_triggered: boolean;
  data_type: string;
}

export interface SensorReading {
  rtu_address: string;
  device_address: string;
  schema: string;
  date: Date;
  point_data: Object;
}

export interface SimulatorRun {
  lab: string;
  step: string;
}
