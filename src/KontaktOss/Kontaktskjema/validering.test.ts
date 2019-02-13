import { orgnrOk } from './validering';

test('Orgnr kan være undefined', () => {
    expect(orgnrOk(undefined)).toBeTruthy();
});

test('Orgnr skal ha 9 siffer', () => {
    expect(orgnrOk('123456789')).toBeTruthy();
});

test('Orgnr kan ikke være lengre enn 9 tegn', () => {
    expect(orgnrOk('1234567890')).toBeFalsy();
});

test('Orgnr kan ikke inneholde annet enn siffer', () => {
    expect(orgnrOk('12345678a')).toBeFalsy();
});
