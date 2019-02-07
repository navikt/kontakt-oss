// TODO: Hent NAIS_CLUSTER_NAME i Node server og eksponer til frontend
const erProd = document.location.href.includes('tjenester.nav.no');
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
