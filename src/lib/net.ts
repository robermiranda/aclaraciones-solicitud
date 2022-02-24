import { Taclaracion, TresponseServer } from '../types/aclaraciones'


export async function postAclaracion (aclaracion: Taclaracion): Promise<TresponseServer> {
    try {
        const response = await fetch('/aclaraciones', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(aclaracion)
        })

        return response.json()
    }
    catch(error) {
        return {
            status: 'error',
            msg: 'ERROR al obtener el nombre de los datos a aclarar'
        }
    }
}


export async function getAclaracion (numeroFolio: number | undefined): Promise<TresponseServer> {
    try {
        let response
        if (numeroFolio) response = await fetch(`/aclaraciones/${numeroFolio}`)
        else response = await fetch('/aclaraciones')

        return response.json()
    }
    catch(error) {
        return {
            status: 'error',
            msg: 'ERROR al obtener el nombre de los datos a aclarar'
        }
    }
}


export async function getNombreDatosAclarar (): Promise<TresponseServer> {
    try {
        const response = await fetch('/datos-aclarar')
        return response.json()
    }
    catch(error) {
        return {
            status: 'error',
            msg: 'ERROR al obtener el nombre de los datos a aclarar'
        }
    }
}
