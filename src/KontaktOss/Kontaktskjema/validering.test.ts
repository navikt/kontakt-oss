import { orgnrOk } from './validering';

// TODO Det er en issue i Jest som hindrer testene i å kjøre på CircleCI. https://github.com/facebook/create-react-app/issues/6591
// TODO Det er fikset i Jest, CRA har ikke oppdatert versjonen. Midlertidig fix: Inkluder "jest-util": "^23.4.0". Slettes når CRA er oppdatert.

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
