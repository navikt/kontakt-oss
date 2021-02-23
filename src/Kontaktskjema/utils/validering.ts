import { validerOrgnr } from '../../utils/orgnrUtils';
import { fjernWhitespace, inneholderKunSifre } from '../../utils/stringUtils';
import { Tema, TemaType } from '../../utils/kontaktskjemaApi';
import {Besvarelse, SkjemaFelt} from './kontaktskjemaUtils';
import {FeiloppsummeringFeil} from "nav-frontend-skjema/src/feiloppsummering";

const LATIN = "a-zA-Z\\- –'._)(/";
const SAMISK = 'ÁáČčĐđŊŋŠšŦŧŽž';
const NORSK = 'æøåÆØÅ';

const VANLIGE_BOKSTAVER = LATIN + SAMISK + NORSK;
const SIFRE = '0-9';
const AKSENTER = 'ëÿüïöäéúíóáèùìòàêûîôâõãñËŸÜÏÖÄÉÚÍÓÁÈÙÌÒÀÊÛÎÔÂÕÃÑ';

const EPOSTTEGN = "[" + VANLIGE_BOKSTAVER + SIFRE + AKSENTER + ".+]+";
const EPOST_REGEX = new RegExp(`^${EPOSTTEGN}@${EPOSTTEGN}\\.${EPOSTTEGN}$`)

export const epostOk = (epost: string = ''): boolean =>
    EPOST_REGEX.test(epost);

export const RAUS_TEXT = VANLIGE_BOKSTAVER + SIFRE + AKSENTER;

const RAUS_TEXT_REGEX = new RegExp('^[' + RAUS_TEXT + ']+$')

const isPresent = (str: string | undefined): boolean =>
    str !== undefined && str.trim() !== '';

interface ValideringResultat {
    ok: boolean;
    feilmelding: Partial<Record<SkjemaFelt, FeiloppsummeringFeil>>;
}

type Validator = (input: string) => string | undefined;
const valideringsregler: Partial<Record<SkjemaFelt, Validator[]>> = {
    [SkjemaFelt.kommune]: [
        (verdi: string) => verdi.trim().length > 0 ? undefined : 'Du må oppgi kommune',
    ],
    [SkjemaFelt.bedriftsnavn]: [
        (verdi: string) => verdi.trim().length > 0 ? undefined : 'Du må oppgi bedriftsnavn',
        (verdi: string) => inneholderKunVanligeTegn(verdi) ? undefined : 'Dette feltet kan ikke inneholde spesialtegn',
    ],
    [SkjemaFelt.orgnr]: [
        (verdi: string) => orgnrOk(verdi) ? undefined : 'Du må oppgi et gyldig organisasjonsnummer',
    ],
    [SkjemaFelt.navn]: [
        (verdi: string) => verdi.trim().length > 0 ? undefined : 'Du må fylle inn navnet ditt',
        (verdi: string) => inneholderKunVanligeTegn(verdi) ? undefined : 'Dette feltet kan ikke inneholde spesialtegn',
    ],
    [SkjemaFelt.epost]: [
        (verdi: string) => verdi.trim().length > 0 ? undefined : 'Du må fylle inn epost',
        (verdi: string) => epostOk(verdi) ? undefined : 'Vennligst oppgi en gyldig e-post-adresse',
    ],
    [SkjemaFelt.telefonnr]: [
        (verdi: string) => verdi.trim().length > 0 ? undefined : 'Du må fylle inn telefonnummer',
        (verdi: string) => telefonnummerOk(verdi) ? undefined : 'Vennligst oppgi et gyldig telefonnummer',
    ],
}

// TODO: ta hensyn til tema
export const validerBesvarelse = (
    besvarelse: Besvarelse,
    tema: Tema
): ValideringResultat => {
    const feilmelding: Partial<Record<SkjemaFelt, FeiloppsummeringFeil>> = Object.fromEntries([
        {felt: SkjemaFelt.kommune, verdi: besvarelse.kommune.nummer},
        {felt: SkjemaFelt.bedriftsnavn, verdi: besvarelse.bedriftsnavn},
        {felt: SkjemaFelt.orgnr, verdi: besvarelse.orgnr},
        {felt: SkjemaFelt.navn, verdi: besvarelse.navn},
        {felt: SkjemaFelt.epost, verdi: besvarelse.epost},
        {felt: SkjemaFelt.telefonnr, verdi: besvarelse.telefonnr},
    ].map(({felt, verdi}) : FeiloppsummeringFeil | undefined =>
        valideringsregler[felt]?.map(valideringsregel => {
            const feilmelding = valideringsregel(verdi);
            return feilmelding ? { skjemaelementId: felt, feilmelding } : undefined;
        }).find(r => r)
    ).filter(
        (e): e is FeiloppsummeringFeil => e !== undefined
    ).map((feil) => {
        return [feil.skjemaelementId, feil]
    }));

    return {
        ok: Object.keys(feilmelding).length === 0,
        feilmelding,
    };
};

export const inneholderKunVanligeTegn = (str: string): boolean => {
    return RAUS_TEXT_REGEX.test(str);
};

export const felterErGyldige = (besvarelse: Besvarelse) =>
    orgnrOk(besvarelse.orgnr) &&
    telefonnummerOk(besvarelse.telefonnr) &&
    epostOk(besvarelse.epost) &&
    inneholderKunVanligeTegn(besvarelse.bedriftsnavn) &&
    inneholderKunVanligeTegn(besvarelse.navn);

export const paakrevdeFelterErUtfylte = (besvarelse: Besvarelse, tema: Tema): boolean => {

    const rekrutteringsfeltUtfylt = tema.type === TemaType.Rekruttering &&
        isPresent(besvarelse.kommune.navn) &&
        isPresent(besvarelse.kommune.nummer);

    const forebyggeSykefraværsfeltUtfylt = tema.type === TemaType.ForebyggeSykefravær &&
        besvarelse.harSnakketMedAnsattrepresentant !== undefined &&
        isPresent(besvarelse.fylkesenhetsnr);

    const fellesFeltUtfylt = isPresent(besvarelse.bedriftsnavn) &&
        isPresent(besvarelse.epost) &&
        isPresent(besvarelse.navn) &&
        isPresent(besvarelse.telefonnr);

    return (rekrutteringsfeltUtfylt || forebyggeSykefraværsfeltUtfylt) && fellesFeltUtfylt;
};

export const orgnrOk = (orgnr?: string): boolean => {
    if (!orgnr) {
        return true;
    }

    orgnr = fjernWhitespace(orgnr);
    if (orgnr.length === 0) {
        return true;
    }

    return validerOrgnr(orgnr);
};

export const telefonnummerOk = (telefonnummer: string = ''): boolean => {
    telefonnummer = fjernWhitespace(telefonnummer);

    if (telefonnummer.length === 0) {
        return false;
    }

    if (telefonnummer[0] === '+') {
        telefonnummer = telefonnummer.substring(1);
    }

    return inneholderKunSifre(telefonnummer);
};

