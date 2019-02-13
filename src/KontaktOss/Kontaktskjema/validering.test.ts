import { orgnrOk } from './validering';

test('Orgnr skal ha 0 eller 9 siffer', () => {
    expect(orgnrOk('')).toBeTruthy();
    expect(orgnrOk('123456789')).toBeTruthy();
    expect(orgnrOk('1236789')).toBeFalsy();
    expect(orgnrOk('1234567890')).toBeFalsy();
});

test('Orgnr kan ikke inneholde annet enn siffer', () => {
    expect(orgnrOk('12345678a')).toBeFalsy();
});
