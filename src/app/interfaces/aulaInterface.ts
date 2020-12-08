export interface AulaInterface {
    idAula: string,
    filas?: number,
    columnas?: number,
    departamento: string,
    equipos?: number, // contiene el número de equipos asignados al aula
    puestos?: number,
    curso: string,
    incidencias?: number,
    pra?: string
}
