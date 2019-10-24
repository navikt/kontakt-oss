import * as React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import './ForebyggeSykefraværEkstradel.less';
import { AnsattrepresentantFelter } from './AnsattrepresentantFelter/AnsattrepresentantFelter';
import { Besvarelse } from '../../KontaktOss/Kontaktskjema/besvarelse';
import { FunctionComponent } from 'react';
import { SkjemaFelt } from '../../KontaktOss/Kontaktskjema/FellesFelter/felter';

interface Props {
    besvarelse: Besvarelse;
    oppdaterBesvarelse: (id: SkjemaFelt, input: string | boolean) => void;
}

export const ForebyggeSykefraværEkstradel: FunctionComponent<Props> = props => {
    return (
        <>
            <AlertStripeInfo className="kontaktskjema-ekstradel typo-normal">
                Arbeidet med å forebygge sykefravær og sikre godt arbeidsmiljø,
                er et ansvar som deles mellom arbeidsgiver og tillitsvalgte
                (eller ansattrepresentanter). NAV Arbeidslivssenter kan bistå i
                dette arbeidet.
            </AlertStripeInfo>
            <AnsattrepresentantFelter
                oppdaterBesvarelse={props.oppdaterBesvarelse}
                besvarelse={props.besvarelse}
            />
        </>
    );
};
