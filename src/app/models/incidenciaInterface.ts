export interface IncidenciaInterface {
    idIncidencia: string,
    idEquipo: string,
    descripcion?: string,
    fechaInicio: string,
    creadaPor: string,
    actuacion?: string,
    fechaFin?: string,
    fechaRecogida?: string,
    recogida?: boolean,
    aula?: string
}
