export interface AulaInterface {
    idAula: string,
    filas?: number,
    columnas?: number,
    departamento: string,
    equipos?: number, // contiene el número de equipos asignados al aula
    puestos?: Puesto[],
    curso: string,
    incidencias?: number,
    pra?: string
}

export interface Puesto {
    docId: string,
    idEquipo: string
}
