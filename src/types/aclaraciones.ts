import { atom, selector } from 'recoil'

export type Tpromovente = {
    nombre: string;
    apPaterno: string;
    apMaterno?: string;
    telefono?: string;
    email: string;
}

export type Ttitular = {
    nombre: string;
    apPaterno: string;
    apMaterno?: string;
}

export type TtipoActo = 'NACIMIENTO' | 'MATRIMONIO' | 'DEFUNCION'

export type TdatosRegistrales = {
    tipoActo: TtipoActo;
    juzgado: string | number;
    libro?: number;
    numeroActa: number;
    anio: number;
    fechaRegistro?: string;
}

export type TdatoAclarar = {
    id: number;
    dato: string;
    dice: string;
    debeDecir: string;
}

export type Tfolio = {
    numeroFolio: number;
    fechaSolicitud: string;
    statusMsg?: string; 
}

export type Taclaracion = {
    promovente: Tpromovente;
    titular: Ttitular;
    datosRegistrales: TdatosRegistrales;
    datosAclarar: Array<TdatoAclarar>;
    folio?: Tfolio;
}

export type TdatosAclararList = {
    nacimiento: Array<string>;
    matrimonio: Array<string>;
    defuncion: Array<string>;
}

type Tstatus = 'ok' | 'warn' | 'error'

export type TresponseServer = {
    status: Tstatus;
    data?: Tfolio | Taclaracion | Array<Taclaracion> | TdatosAclararList;
    msg?: string; 
}

export const promoventeState = atom<Tpromovente>({
    key: 'promovente',
    default: {
        nombre: '',
        apPaterno: '',
        apMaterno: '',
        telefono: '',
        email: ''
    }
})

export const datosRegistralesState = atom<TdatosRegistrales>({
    key: 'datos-registrales',
    default: {
        tipoActo: 'NACIMIENTO',
        juzgado: '',
        libro: 0,
        numeroActa: 0,
        anio: 0
    }
})

export const titularState = atom<Ttitular>({
    key: 'titular',
    default: {
        nombre: '',
        apPaterno: '',
        apMaterno: ''
    }
})

export const datosAclararState = atom<TdatoAclarar[]>({
    key: 'datos-aclarar',
    default: []
})

export const nombreTitularSelector = selector <Ttitular | string> ({
    key: 'titular-selector',
    get: function({get}): string {
        const titular = get(titularState)
        return `${titular.nombre} ${titular.apPaterno} ${titular.apMaterno}`
    }
})

export const nombrePromoventeSelector = selector <Tpromovente | string> ({
    key: 'promovente-selector',
    get: function ({ get }): string {
        const promovente = get(promoventeState);
        return `${promovente.nombre} ${promovente.apPaterno} ${promovente.apMaterno}`
    },
})

export function isFolio (response: TresponseServer["data"]):  response is Tfolio {
    return (response as Tfolio).numeroFolio !== undefined
}

export function isAclaracion (response: TresponseServer["data"]):  response is Taclaracion {
    return (response as Taclaracion).datosRegistrales.tipoActo !== undefined
}

export function isDatosAclararList (response: TresponseServer["data"]): response is TdatosAclararList {
    return (response as TdatosAclararList).nacimiento !== undefined
}