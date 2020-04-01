import { Tema, TemaType } from './kontaktskjemaApi';

export const logEvent = (eventNavn: string, felter?: {}, tags?: {}) => {
    // TODO Implementer Amplitude
};

export const logSendInnKlikk = () => logEvent('kontakt-oss.send-inn-klikk');
export const logSuccess = (tema: Tema) => {
    logEvent('kontakt-oss.success', {
        tema: mapTilTemaEvent(tema),
    });
};
export const logFail = () => logEvent('kontakt-oss.fail');

export const mapTilTemaEvent = (tema?: Tema): string => {
    if (!tema) {
        return 'default';
    }
    switch (tema.type) {
        case TemaType.Rekruttering:
            return 'rekruttering';
        case TemaType.RekrutteringMedTilrettelegging:
            return 'rekruttering-med-tilrettelegging';
        case TemaType.Arbeidstrening:
            return 'arbeidstrening';
        case TemaType.ForebyggeSykefravær:
            return 'forebygge-sykefravaer';
        default:
            return 'default';
    }
};
