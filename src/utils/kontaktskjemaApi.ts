import Environment from './Environment';

const erProd = Environment.MILJO === 'prod-sbs';
const KONTAKTSKJEMA_API = erProd
    ? 'https://arbeidsgiver.nav.no'
    : 'https://arbeidsgiver-q.nav.no';

export const KONTAKTSKJEMA_PATH = `${KONTAKTSKJEMA_API}/kontaktskjema/meldInteresse`;

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
    return fetch(KONTAKTSKJEMA_PATH, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            NAV_CSRF_PROTECTION: getCookie('NAV_CSRF_PROTECTION'),
        },
        body: JSON.stringify(kontaktskjema),
    }).then(response => response.json());
};

const getCookie = (name: string) => {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};
