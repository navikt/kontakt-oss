import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { Link } from 'react-router-dom';
import { SAMLESIDE_PATH } from '../../../../utils/konstanter';
import veiledereIllustrasjon from './veiledere.svg';
import './bekreftelse-lenkepanel.less';

const BekreftelseLenkepanel = () => (
    <LenkepanelBase
        href={SAMLESIDE_PATH}
        className="bekreftelse-lenkepanel"
        // TODO: Fiks any
        linkCreator={(props: any) => (
            <Link to={props.href} className={props.className}>
                {props.children}
            </Link>
        )}
    >
        <img
            src={veiledereIllustrasjon}
            className="bekreftelse-lenkepanel__ikon"
        />
        <div className="bekreftelse-lenkepanel__innhold">
            <Undertittel className="bekreftelse-lenkepanel__tittel">
                Hva kan NAV tilby?
            </Undertittel>
            <Normaltekst>Les mer om mulighetene</Normaltekst>
        </div>
    </LenkepanelBase>
);

export default BekreftelseLenkepanel;
