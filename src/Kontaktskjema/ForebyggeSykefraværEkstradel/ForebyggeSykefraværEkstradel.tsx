import * as React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import './ForebyggeSykefraværEkstradel.less';

export const ForebyggeSykefraværEkstradel = () => {
    // TODO Legg til mer her
    return (
        <AlertStripeInfo className="kontaktskjema-ekstradel typo-normal">
            Arbeidet med å forebygge sykefravær og sikre godt arbeidsmiljø, er
            et ansvar som deles mellom arbeidsgiver og tillitsvalgte (eller
            ansattrepresentanter). NAV Arbeidslivssenter kan bistå i dette
            arbeidet.
        </AlertStripeInfo>
    );
};
