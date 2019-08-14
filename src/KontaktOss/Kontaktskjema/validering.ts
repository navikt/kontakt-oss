import { validerOrgnr } from '../../utils/orgnrUtils';
import { fjernWhitespace, inneholderKunSifre } from '../../utils/stringUtils';
import { Besvarelse } from './besvarelse';
import { Tema, TemaType } from '../../utils/kontaktskjemaApi';

const LATIN = "a-zA-Z- –'._)(/";
const SAMISK = 'ÁáČčĐđŊŋŠšŦŧŽž';
const NORSK = 'æøåÆØÅ';

const VANLIGE_BOKSTAVER = LATIN + SAMISK + NORSK;
const SIFRE = '0-9';
const AKSENTER = 'ëÿüïöäéúíóáèùìòàêûîôâõãñËŸÜÏÖÄÉÚÍÓÁÈÙÌÒÀÊÛÎÔÂÕÃÑ';
const EPOSTTEGN = VANLIGE_BOKSTAVER + SIFRE + AKSENTER + '.@+';

export const RAUS_TEXT = VANLIGE_BOKSTAVER + SIFRE + AKSENTER;

const isFalsyOrEmpty = (str: string | undefined): boolean => {
    return !str || str === '';
};

interface ValideringResultat {
    ok: boolean;
    feilmelding?: string;
}

export const validerBesvarelse = (
    besvarelse: Besvarelse,
    tema: Tema,
    orgnrObligatoriskToggle: boolean
): ValideringResultat => {
    let feilmelding;
    if (!paakrevdeFelterErUtfylte(besvarelse, tema, orgnrObligatoriskToggle)) {
        feilmelding = 'Du må fylle ut alle feltene for å sende inn.';
    } else if (!felterErGyldige(besvarelse)) {
        feilmelding = 'Ett eller flere av feltene er ikke fylt ut riktig.';
    } else {
        return { ok: true };
    }

    return {
        ok: false,
        feilmelding,
    };
};

const validerString = (str: string, skalBareInneholde: string): boolean => {
    return new RegExp('^[' + skalBareInneholde + ']*$').test(str);
};

export const inneholderKunVanligeTegn = (str: string): boolean => {
    return validerString(str, RAUS_TEXT);
};

export const felterErGyldige = (besvarelse: Besvarelse) =>
    orgnrOk(besvarelse.orgnr) &&
    telefonnummerOk(besvarelse.telefonnr) &&
    epostOk(besvarelse.epost) &&
    inneholderKunVanligeTegn(besvarelse.bedriftsnavn) &&
    inneholderKunVanligeTegn(besvarelse.fornavn) &&
    inneholderKunVanligeTegn(besvarelse.etternavn);

export const paakrevdeFelterErUtfylte = (
    besvarelse: Besvarelse,
    tema: Tema,
    orgnrObligatoriskToggle: boolean
): boolean => {
    if (
        tema.type === TemaType.ForebyggeSykefravær &&
        besvarelse.harSnakketMedAnsattrepresentant === undefined
    ) {
        return false;
    }
    const harTommeFelter: boolean =
        !besvarelse ||
        !besvarelse.kommune ||
        isFalsyOrEmpty(besvarelse.kommune.navn) ||
        isFalsyOrEmpty(besvarelse.kommune.nummer) ||
        isFalsyOrEmpty(besvarelse.bedriftsnavn) ||
        isFalsyOrEmpty(besvarelse.epost) ||
        isFalsyOrEmpty(besvarelse.etternavn) ||
        isFalsyOrEmpty(besvarelse.fornavn) ||
        isFalsyOrEmpty(besvarelse.telefonnr) ||
        (orgnrObligatoriskToggle && isFalsyOrEmpty(besvarelse.orgnr));
    return !harTommeFelter;
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

export const epostOk = (epost: string = ''): boolean =>
    validerString(epost, EPOSTTEGN) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(epost);
