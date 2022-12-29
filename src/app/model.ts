export interface Location {
  id: number;
  name: string;
  imageData: string;
}

export interface Device {
  id: number;
  locationId: number;
  rtuAddress: string;
  deviceAddress: string;
  schema: string;
  pointData: Object;
  x: number;
  y: number;
  imagePath: string;
  displayPoints: DisplayPoint[];
}

export interface DisplayPoint {
  id: number;
  name: string;
}

export interface Reading {
  rtuAddress: string;
  deviceAddress: string;
  schema: string;
  date: Date;
  pointData: Object;
}
