export interface GovernorateType {
  id: number;
  name: string;
  lng: string;
  lat: string;
  objectid: string;
}

export interface AreaType {
  id: number;
  name: string;
  lng: string;
  lat: string;
  delivery_price: string;
  objectid: string;
}

export interface BlockType {
  id: number;
  name: string;
  lng: string;
  lat: string;
  objectid: string;
}

export interface StreetType {
  id: number;
  name: string;
  lng: string;
  lat: string;
  objectid: string;
}

export interface GovernorateResponse {
  success: boolean;
  message: string;
  data: GovernorateType[];
}

export interface AreaResponse {
  success: boolean;
  message: string;
  data: AreaType[];
}

export interface StreetResponse {
  success: boolean;
  message: string;
  data: StreetType[];
}

export interface BlockResponse {
  success: boolean;
  message: string;
  data: BlockType[];
}
