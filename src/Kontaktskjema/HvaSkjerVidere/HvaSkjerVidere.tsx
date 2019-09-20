import React, { FunctionComponent } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import brevSvg from './brev.svg';
import dameSvg from './nav-dame.svg';
import skiltSvg from './skilt.svg';
import PanelBase from 'nav-frontend-paneler';
import './HvaSkjerVidere.less';
import { BildeMedTekst } from './BildeMedTekst/BildeMedTekst';

export const HvaSkjerVidere: FunctionComponent = () => {
    return (
        <PanelBase border className="hva-skjer-videre">
            <Undertittel>
                Hva skjer med henvendelsen min?
            </Undertittel>
            <BildeMedTekst
                svg={brevSvg}
                tekst={'Henvendelsen blir sendt til ditt lokale NAV kontor'}
            />
            <BildeMedTekst
                svg={dameSvg}
                tekst={'Det lokale kontoret ruter den til den på kontoret som best kan svare'}
            />
            <BildeMedTekst
                svg={skiltSvg}
                tekst={'En NAV-ansatt tar kontakt med deg på telefon eller e-post'}
            />
        </PanelBase>
    );
};
