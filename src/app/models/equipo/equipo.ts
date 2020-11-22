export interface Equipo {
    idEquipo?: string,
    estado: string,
    hardware: {
        marca: string,
        modelo: string,
        procesador: string,
        memoria: string,
        discoDuro: string,
        numSerie: string,
        direccionMAC: string,
        monitor: string,
        raton: boolean,
        teclado: boolean
    },
    software?: {
        SO: string,
        officeVersion: string,
        antivirus: string,
        ide1: string,
        ide2: string,
        otros: string,
        userProfesor: string,
        passProfesor: string,
        alumno1: string,
        alumno2: string
    },
    ubicacion?: {
        aula: string,
        departamento: string,
        puesto: string
    }
}
