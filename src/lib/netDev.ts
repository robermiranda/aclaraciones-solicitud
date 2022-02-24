import { Taclaracion, TresponseServer } from '../types/aclaraciones'


function resolveAfterNSeconds(n: number): Promise<number> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(0);
        }, n*1000);
    });
}

export async function postAclaracion (aclaracion: Taclaracion): Promise<TresponseServer> {

    await resolveAfterNSeconds(5)

    return {
        status: 'ok',
        data: {
            numeroFolio: 1,
            fechaSolicitud: "25/02/2022 14:45:26",
            statusMsg: 'Aceptada'
        }
    }
}

export async function getAclaracion (numeroFolio: number | undefined): Promise<TresponseServer> {
    
    await resolveAfterNSeconds(5)
    
    if (numeroFolio === undefined) {
        return {
            status: 'ok',
            data: [aclaracion1, aclaracion2]
        }
    }

    return {
        status: 'ok',
        data: aclaracion1
    }
}


export async function getNombreDatosAclarar (): Promise<TresponseServer> {
    await resolveAfterNSeconds(5)

    return {
        status: 'ok',
        data: {
            nacimiento: ["NOMBRE", "AP PATERNO", "AP MATERNO"],
            matrimonio: ["NOMBRE EL", "AP PATERNO EL", "AP MATERNO EL"],
            defuncion: ["NOMBRE DIFUNTO", "AP PATERNO DIFUNTO", "AP MATERNO DIFUNTO"],
        }
    }
}

const aclaracion1: Taclaracion = {
    promovente: {
        nombre: 'Juan Carlos',
        apPaterno: 'Perez del Prado',
        apMaterno: 'Jimenez Cacho',
        telefono: '55 5556 0733',
        email: 'juanCarlos@yahoo.com.mx'
    },
    titular: {
        nombre: 'José Alejandro Ignacio Casimiro',
        apPaterno: 'Casas de Alba',
        apMaterno: 'De la Mirandola',
    },
    datosRegistrales: {
        tipoActo: 'DEFUNCION',
        juzgado: 7,
        libro: 5,
        numeroActa: 568,
        anio: 1987,
        fechaRegistro: '31/01/1997'
    },
    datosAclarar: [
        {
            id: 1,
            dato: 'Nombre del Abuelo Paterno',
            dice: 'José Ramiro Casimiro',
            debeDecir: 'José Ramiro'
        },
        {
            id: 2,
            dato: 'Fecha de Nacimiento',
            dice: '---',
            debeDecir: '12 De Marzo de 1956'
        }
    ],
    folio: {
        numeroFolio: 85,
        fechaSolicitud: "05/12/2021",
        statusMsg: 'En Revisión'
    }
}

const aclaracion2: Taclaracion = {
    promovente: {
        nombre: 'Roberto Alberto Jacinto',
        apPaterno: 'Arellano',
        apMaterno: 'De la Llata',
        telefono: '55 5556 0733',
        email: 'rober.beto@gmail.com'
    },
    titular: {
        nombre: 'María Blanca',
        apPaterno: 'Paredes',
        apMaterno: 'Y Caza',
    },
    datosRegistrales: {
        tipoActo: 'MATRIMONIO',
        juzgado: 7,
        libro: 5,
        numeroActa: 568,
        anio: 1987
    },
    datosAclarar: [
        {
            id: 1,
            dato: 'Nombre del Abuelo Paterno',
            dice: 'José Ramiro Casimiro',
            debeDecir: 'José Ramiro'
        },
        {
            id: 2,
            dato: 'Fecha de Nacimiento',
            dice: '---',
            debeDecir: '12 De Marzo de 1956'
        }
    ],
    folio: {
        numeroFolio: 659,
        fechaSolicitud: "17/08/2003",
        statusMsg: 'En Revisión'
    }
}