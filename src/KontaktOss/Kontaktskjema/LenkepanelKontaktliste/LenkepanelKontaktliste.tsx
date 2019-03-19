import * as React from 'react';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Undertittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { logEvent } from '../../../utils/metricsUtils';
import telefonSvg from './telefon.svg';
import './LenkepanelKontaktliste.less';
import { getHrefTilKontaktliste } from '../../../utils/fylker';

interface Props {
    tittel: string;
    undertekst: string;
    sendMetrikk?: boolean;
    fylke: string;
}

const LenkepanelKontaktliste: React.FunctionComponent<Props> = props => {
    const href = getHrefTilKontaktliste(props.fylke) + '?fraKontaktskjema=true';

    const linkCreator = (linkProps: any) => (
        <a
            onClick={() => {
                props.sendMetrikk && logEvent('kontakt-oss.vil-ringe-knapp');
            }}
            {...linkProps}
        >
            {linkProps.children}
        </a>
    );


    return (
        <LenkepanelBase
            href={href}
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
