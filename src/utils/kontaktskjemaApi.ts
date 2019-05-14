import { SEND_KONTAKTSKJEMA_PATH } from './paths';
import { fjernWhitespace } from './stringUtils';
import { Besvarelse } from '../KontaktOss/Kontaktskjema/besvarelse';

export enum TemaType {
    REKRUTTERING = 'REKRUTTERING',
    REKRUTTERING_MED_TILRETTELEGGING = 'REKRUTTERING_MED_TILRETTELEGGING',
    ARBEIDSTRENING = 'ARBEIDSTRENING',
    OPPFØLGING_AV_EN_ARBEIDSTAKER = 'OPPFØLGING_AV_EN_ARBEIDSTAKER',
    ANNET = 'ANNET',
}

export interface Tema {
    type: TemaType;
    tekst: string;
}

export const temaer: Tema[] = [
    {
        type: TemaType.REKRUTTERING,
        tekst: 'Rekruttering',
    },
    {
        type: TemaType.REKRUTTERING_MED_TILRETTELEGGING,
        tekst: 'Rekruttering med tilrettelegging',
    },
    {
        type: TemaType.ARBEIDSTRENING,
        tekst: 'Arbeidstrening',
    },
    {
        type: TemaType.OPPFØLGING_AV_EN_ARBEIDSTAKER,
        tekst: 'Oppfølging av en arbeidstaker',
    },
    {
        type: TemaType.ANNET,
        tekst: 'Annet',
    },
];

export type BesvarelseBackend = {
    fylke: string;
    kommune: string;
    kommunenr: string;
    bedriftsnavn: string;
    orgnr: string;
    fornavn: string;
    etternavn: string;
    epost: string;
    telefonnr: string;
    tema: Tema;
};

const oversettTilJson = (besvarelse: Besvarelse, tema: Tema) => {
    const besvarelseBackend: BesvarelseBackend = {
        ...besvarelse,
        orgnr: fjernWhitespace(besvarelse.orgnr),
        kommune: besvarelse.kommune.navn,
        kommunenr: besvarelse.kommune.nummer,
        tema: tema,
    };
    return JSON.stringify(besvarelseBackend);
};

export const sendKontaktskjema = async (besvarelse: Besvarelse, tema: Tema) => {
    const response = await fetch(SEND_KONTAKTSKJEMA_PATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: oversettTilJson(besvarelse, tema),
    });
    return await response.json();
};
