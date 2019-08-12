import {
    epostOk,
    orgnrOk,
    telefonnummerOk,
    validerBesvarelse,
} from './validering';
import { Besvarelse } from './besvarelse';
import { Tema, TemaType } from '../../utils/kontaktskjemaApi';

const gyldigBesvarelse: Besvarelse = {
    kommune: {
        nummer: '2021',
        navn: 'Kárášjohka – Karasjok',
    },
    bedriftsnavn: 'Brillefestival AS',
    orgnr: '000000000',
    fornavn: 'Eígil-Eilberñt',
    etternavn: 'Wùxlér',
    epost: 'eígil.eilberñt.wùxlér@brillefestivalen.com',
    telefonnr: ' +  01 99 99   222      ',
    fylke: 'oslo',
    harSnakketMedAnsattrepresentant: false,
};

const gyldigTema: Tema = {
    type: TemaType.Arbeidstrening,
    tekst: 'Arbeidstrening é é ñ ũ',
};

describe("Test av validering", () => {

    test('Orgnr kan være undefined', () => {
        expect(orgnrOk(undefined)).toBeTruthy();
    });

    test('Orgnr skal ha 0 eller 9 siffer', () => {
        expect(orgnrOk('')).toBeTruthy();
        expect(orgnrOk('430799460')).toBeTruthy();
        expect(orgnrOk('1236789')).toBeFalsy();
        expect(orgnrOk('1234567890')).toBeFalsy();
    });

    test('Orgnr kan ikke inneholde annet enn siffer', () => {
        expect(orgnrOk('430799460a')).toBeFalsy();
    });

    test('Telefonnummer kan inneholde et vilkårlig antall siffer', () => {
        expect(telefonnummerOk('1')).toBeTruthy();
        expect(telefonnummerOk('1234')).toBeTruthy();
        expect(telefonnummerOk('96027582')).toBeTruthy();
    });

    test('Telefonnummer kan inneholde mellomrom', () => {
        expect(telefonnummerOk('960 27 582')).toBeTruthy();
        expect(telefonnummerOk('96 02 75 82')).toBeTruthy();
        expect(telefonnummerOk(' 0047 9602 7582 ')).toBeTruthy();
    });

    test('Telefonnummer kan starte med ett plusstegn', () => {
        expect(telefonnummerOk('+47 96027582')).toBeTruthy();
        expect(telefonnummerOk('++47 96027582')).toBeFalsy();
    });

    test('Telefonnummer kan ikke inneholde andre tegn', () => {
        expect(telefonnummerOk('-47 960 27 852')).toBeFalsy();
        expect(telefonnummerOk('📞')).toBeFalsy();
    });

    test('E-post må være på formatet "noe@noe.noe"', () => {
        expect(epostOk('noe@noe.noe')).toBeTruthy();
        expect(epostOk('ceo@evil.org')).toBeTruthy();
        expect(epostOk('ds091nxm+1p09w$"@æøå¨^.21io&%')).toBeTruthy();
        expect(epostOk('ola@typisk@nordmann.no')).toBeFalsy();
        expect(epostOk('ola@nordmann')).toBeFalsy();
    });

    test('Gyldig skjema skal valideres OK', () => {
        expect(
            validerBesvarelse(gyldigBesvarelse, gyldigTema, false).ok
        ).toBeTruthy();
    });

    test('Skjema skal ikke inneholde spesialtegn', () => {
        const valider = (felt: any) => validerBesvarelse({...gyldigBesvarelse, ...felt}, gyldigTema, false);

        expect(valider({ bedriftsnavn: "'drop table kontaktskjema;" }).ok).toBeFalsy();
        expect(valider({ fornavn: "</span> <script></script> <span>" }).ok).toBeFalsy();
        expect(valider({ etternavn: "'drop table kontaktskjema;" }).ok).toBeFalsy();
        expect(valider({ fylke: "</span> <script></script> <span>" }).ok).toBeFalsy();
        expect(valider({ kommune: "'drop table kontaktskjema;" }).ok).toBeFalsy();
        expect(valider({ orgnr: "</span> <script></script> <span>" }).ok).toBeFalsy();
        expect(valider({ telefonnr: "'drop table kontaktskjema;" }).ok).toBeFalsy();
        expect(valider({ epost: "</span> <script></script> <span>" }).ok).toBeFalsy();
    });
});
