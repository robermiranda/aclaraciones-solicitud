import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil'
import { postAclaracion } from '../../lib/net'
import   Acuse from './Acuse'
import {
    promoventeState,
    titularState,
    datosAclararState,
    datosRegistralesState,
    TresponseServer,
    isFolio } from '../../types/aclaraciones'


// Acuse Vista Previa
export default function AcuseVP () {

    const promovente = useRecoilValue(promoventeState)

    const titular = useRecoilValue(titularState)

    const datosRegistrales = useRecoilValue(datosRegistralesState)

    const datosAclarar = useRecoilValue(datosAclararState)

    const [fecha, setFecha] = useState<string>("00/00/00")

    const [numeroFolio, setNumeroFolio] = useState<number>(0)

    const [statusAclaracionMsg, setStatusAclaracionMsg] = useState<string>('')

    useEffect(() => {
        const aclaracion = {
            promovente,
            titular,
            datosRegistrales,
            datosAclarar
        }

        postAclaracion(aclaracion)
        .then((response: TresponseServer) => {
            if (response.status === 'ok' && isFolio(response.data)) {
                setNumeroFolio(response.data.numeroFolio)
                setFecha(response.data.fechaSolicitud)
                if (response.data.statusMsg) {
                    setStatusAclaracionMsg(response.data.statusMsg)
                }
            }
        })
    }, [promovente, titular, datosRegistrales, datosAclarar])


    if ( ! numeroFolio) return <p>Guardando datos . . .</p>
    else return <Acuse
        promovente={promovente}
        titular={titular}
        datosRegistrales={datosRegistrales}
        datosAclarar={datosAclarar}
        numeroFolio={numeroFolio}
        fecha={fecha}
        vistaPrevia={true}
        statusAclaracionMsg={statusAclaracionMsg}/>
}