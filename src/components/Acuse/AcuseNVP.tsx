import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getAclaracion } from '../../lib/net'
import   Acuse from './Acuse'
import   NotFound from '../NotFound'
import { Tfolio, TresponseServer, isAclaracion } from '../../types/aclaraciones'
import {
    Tpromovente,
    Ttitular,
    TdatoAclarar,
    TdatosRegistrales } from '../../types/aclaraciones'


// Acuse No Vista Previa
export default function AcuseNVP () {

    const { numeroFolio } = useParams()

    const [status, setStatus] = useState<string>('')

    const [promovente, setPromovente] = useState<Tpromovente>({
        nombre: '',
        apPaterno: '',
        email: ''
    })

    const [titular, setTitular] = useState<Ttitular>({
        nombre: '',
        apPaterno: ''
    })

    const [datosAclarar, setDatosAclarar] = useState<Array<TdatoAclarar>>([])

    const [datosRegistrales, setDatosRegistrales] = useState<TdatosRegistrales>({
        tipoActo: 'NACIMIENTO',
        juzgado: '',
        numeroActa: 0,
        anio: 0
    })

    const [folio, setFolio] = useState<Tfolio>({
        numeroFolio: 0,
        fechaSolicitud: "00/00/00 00:00:00"
    })

    useEffect(() => {
        if (numeroFolio) {
            getAclaracion(parseInt(numeroFolio))
            .then((response: TresponseServer) => {
                setStatus(response.status)
                if (response.status === 'ok' && isAclaracion(response.data)) {
                    setPromovente(response.data.promovente)
                    setTitular(response.data.titular)
                    setDatosRegistrales(response.data.datosRegistrales)
                    setDatosAclarar(response.data.datosAclarar)
                    if (response.data.folio) setFolio(response.data.folio)
                }
            })
            .catch((error: TresponseServer) => {
                console.log("ERROR al obtener la aclaracion con folio", numeroFolio, error)
                setStatus('error')
            })
        }
    }, [numeroFolio])

    if (status === 'error') return <NotFound msg='Error al obtener los datos'/>
    else if (status === 'warn') return <NotFound msg={`Sin resultados para el folio: ${numeroFolio}`}/>
    else if (status === 'ok') return <Acuse
        promovente={promovente}
        titular={titular}
        datosRegistrales={datosRegistrales}
        datosAclarar={datosAclarar}
        numeroFolio={folio.numeroFolio}
        fecha={folio.fechaSolicitud}
        vistaPrevia={false}
        statusAclaracionMsg={ folio.statusMsg || ' '}/>
    else return <p>Esperando datos . . .</p>
}