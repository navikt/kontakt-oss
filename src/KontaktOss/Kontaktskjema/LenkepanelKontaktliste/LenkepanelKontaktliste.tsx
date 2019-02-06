import * as React from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Undertittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { logEvent } from '../../../utils/metricsUtils';
import telefonSvg from './telefon.svg';
import './LenkepanelKontaktliste.less';

interface Props {
    href: string;
    tittel: string;
    undertekst: string;
}

const LenkepanelKontaktliste: React.FunctionComponent<Props> = props => {
    // TODO: Fiks any
    const linkCreator = (linkProps: any) => (
        <a
            onClick={() => {
                // TODO: Endre navn på event
                logEvent(
                    'veiviserarbeidsgiver.inkludering.kontaktskjema.vil-ringe-knapp'
                );
            }}
            {...linkProps}
        >
            {linkProps.children}
        </a>
    );

    return (
        <LenkepanelBase
            href={props.href}
            className="stortlenkepanel"
            linkCreator={linkCreator}
        >
            <img src={telefonSvg} className="stortlenkepanel__bilde" alt="" />
            <div className="stortlenkepanel__innhold">
                <Undertittel className="stortlenkepanel__innhold-tittel">
                    {props.tittel}
                </Undertittel>
                <Normaltekst>{props.undertekst}</Normaltekst>
            </div>
        </LenkepanelBase>
    );
};

export default LenkepanelKontaktliste;
