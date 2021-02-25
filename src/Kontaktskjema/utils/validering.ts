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

export const epostOk = (epost = ''): boolean =>
    EPOST_REGEX.test(epost);

export const RAUS_TEXT = VANLIGE_BOKSTAVER + SIFRE + AKSENTER;

const RAUS_TEXT_REGEX = new RegExp('^[' + RAUS_TEXT + ']+$')

const isPresent = (str: string | undefined): boolean =>
    str !== undefined && str.trim() !== '';

interface ValideringResultat {
    ok: boolean;
    feilmelding: Partial<Record<SkjemaFelt, FeiloppsummeringFeil>>;
}

type Validator<T> = (input: T, tema: Tema) => string | undefined;
const valideringsregler: {[felt in SkjemaFelt]: Validator<Besvarelse[felt]>[]} /* Record<SkjemaFelt, Validator<string>[]> */ = {
    [SkjemaFelt.kommune]: [
        (verdi, tema) => tema.type === TemaType.Rekruttering && !isPresent(verdi.nummer) ? 'Du må oppgi kommune' : undefined,
    ],
    [SkjemaFelt.harSnakketMedAnsattrepresentant]: [
        (verdi, tema) => tema.type === TemaType.ForebyggeSykefravær && verdi === undefined ? 'Du må oppgi om du har snakket med representant' : undefined,
    ],
    [SkjemaFelt.fylkesenhetsnr]: [
        (verdi, tema) => tema.type === TemaType.ForebyggeSykefravær && !isPresent(verdi) ? 'Du må oppgi fylke' : undefined,
    ],
    [SkjemaFelt.bedriftsnavn]: [
        (verdi, _) => isPresent(verdi) ? undefined : 'Du må oppgi bedriftsnavn',
        (verdi, _) => inneholderKunVanligeTegn(verdi) ? undefined : 'Dette feltet kan ikke inneholde spesialtegn',
    ],
    [SkjemaFelt.orgnr]: [
        (verdi, _) => orgnrOk(verdi) ? undefined : 'Du må oppgi et gyldig organisasjonsnummer',
    ],
    [SkjemaFelt.navn]: [
        (verdi, _) => isPresent(verdi) ? undefined : 'Du må fylle inn navnet ditt',
        (verdi, _) => inneholderKunVanligeTegn(verdi) ? undefined : 'Dette feltet kan ikke inneholde spesialtegn',
    ],
    [SkjemaFelt.epost]: [
        (verdi, _) => isPresent(verdi) ? undefined : 'Du må fylle inn epost',
        (verdi, _) => epostOk(verdi) ? undefined : 'Vennligst oppgi en gyldig e-post-adresse',
    ],
    [SkjemaFelt.telefonnr]: [
        (verdi, _) => isPresent(verdi) ? undefined : 'Du må fylle inn telefonnummer',
        (verdi, _) => telefonnummerOk(verdi) ? undefined : 'Vennligst oppgi et gyldig telefonnummer',
    ],
}

export const validerBesvarelse = (
    besvarelse: Besvarelse,
    tema: Tema
): ValideringResultat => {
    const feilmelding: Partial<Record<SkjemaFelt, FeiloppsummeringFeil>> = Object.fromEntries([
        SkjemaFelt.kommune,
        SkjemaFelt.harSnakketMedAnsattrepresentant,
        SkjemaFelt.fylkesenhetsnr,
        SkjemaFelt.bedriftsnavn,
        SkjemaFelt.orgnr,
        SkjemaFelt.navn,
        SkjemaFelt.epost,
        SkjemaFelt.telefonnr,
    ].flatMap((felt: SkjemaFelt): [string, FeiloppsummeringFeil][] =>
        (valideringsregler[felt] as Validator<Besvarelse[typeof felt]>[])
            .map((valideringsregel): FeiloppsummeringFeil | undefined => {
                const feilmelding = valideringsregel(besvarelse[felt], tema);
                return feilmelding ? { skjemaelementId: felt, feilmelding } : undefined;
            })
            .filter((e): e is FeiloppsummeringFeil => e !== undefined)
            .map((feil): [string, FeiloppsummeringFeil] => [feil.skjemaelementId, feil])
            .slice(0, 1)
    ));

    return {
        ok: Object.keys(feilmelding).length === 0,
        feilmelding,
    };
};

export const inneholderKunVanligeTegn = (str: string): boolean => {
    return RAUS_TEXT_REGEX.test(str);
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

export const telefonnummerOk = (telefonnummer = ''): boolean => {
    telefonnummer = fjernWhitespace(telefonnummer);

    if (telefonnummer.length === 0) {
        return false;
    }

    if (telefonnummer[0] === '+') {
        telefonnummer = telefonnummer.substring(1);
    }

    return inneholderKunSifre(telefonnummer);
};

