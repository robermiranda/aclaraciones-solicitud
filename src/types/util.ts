import { atom } from 'recoil'

export type dataControl = {
    vistaPrevia: boolean;
}

export const dataControlState = atom <dataControl> ({
    key: 'data-control',
    default: {
        vistaPrevia: false,
    }
})
