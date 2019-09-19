export const BASE_PATH = '/kontakt-oss';
export const BEKREFTELSE_PATH = '/bekreftelse';
export const FYLKESVELGER_PATH = '/fylkesvelger';

// TODO TAG-826 Flytt samlesiden til root (/kontakt-oss).
export const SAMLESIDE_PATH = '/samleside';

export const SEND_KONTAKTSKJEMA_PATH = `${BASE_PATH}/api/meldInteresse`;
export const FYLKER_OG_KOMMUNER_PATH = `${BASE_PATH}/api/fylkerOgKommuner`;
export const FEATURE_TOGGLE_BASEPATH = `${BASE_PATH}/api/feature`;

export const featureTogglePath = (features: string[]): string => {
    const query = features.map(feature => `feature=${feature}`).join('&');
    return FEATURE_TOGGLE_BASEPATH + '?' + query;
};
