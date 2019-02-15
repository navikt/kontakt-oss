import { orgnrOk } from './validering';

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
