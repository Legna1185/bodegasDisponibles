export interface CodigoPostalData {
  c_Estado: string;
  Estado: string;
  c_Municipio: string;
  Municipio: string;
}

export interface CodigoPostalResponse {
  success: boolean;
  data: CodigoPostalData;
}
