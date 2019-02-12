import { SEND_KONTAKTSKJEMA_PATH } from './paths';

export type Tema =
    | 'Rekruttering'
    | 'Rekruttering med tilrettelegging'
    | 'Arbeidstrening'
    | 'Oppfølging av en arbeidstaker'
    | 'Annet';

export type KontaktskjemaModell = {
    fylke?: string;
    kommune?: string;
    kommunenr?: string;
    bedriftsnavn?: string;
    bedriftsnr?: string;
    fornavn?: string;
    etternavn?: string;
    epost?: string;
    telefonnr?: string;
    tema: Tema;
};

export const sendKontaktskjema = (
    kontaktskjema: KontaktskjemaModell
): Promise<Response> => {
    return fetch(SEND_KONTAKTSKJEMA_PATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(kontaktskjema),
    }).then(response => response.json());
};
