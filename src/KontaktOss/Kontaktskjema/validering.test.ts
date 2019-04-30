import { orgnrOk, telefonnummerOk } from './validering';

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
