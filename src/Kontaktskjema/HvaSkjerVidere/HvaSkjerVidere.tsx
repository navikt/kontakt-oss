import React, { FunctionComponent } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import brevSvg from './brev.svg';
import dameSvg from './nav-dame.svg';
import skiltSvg from './skilt.svg';
import pilSvg from './pil.svg';
import PanelBase from 'nav-frontend-paneler';
import './HvaSkjerVidere.less';
import { BildeMedTekst } from './BildeMedTekst/BildeMedTekst';

// TODO Farge på pil-svg?
export const HvaSkjerVidere: FunctionComponent = () => {
    return (
        <PanelBase className="hva-skjer-videre">
            <Undertittel>Hva skjer med henvendelsen min?</Undertittel>
            <div className="hva-skjer-videre__steg-wrapper">
                <BildeMedTekst
                    svg={brevSvg}
                    tekst={'Henvendelsen blir sendt til ditt lokale NAV kontor'}
                />
                <img src={pilSvg} alt="" className="hva-skjer-videre__pil" />
                <BildeMedTekst
                    svg={dameSvg}
                    tekst={
                        'Det lokale kontoret ruter den til den på kontoret som best kan svare'
                    }
                />
                <img src={pilSvg} alt="" className="hva-skjer-videre__pil" />
                <BildeMedTekst
                    svg={skiltSvg}
                    tekst={
                        'En NAV-ansatt tar kontakt med deg på telefon eller e-post'
                    }
                />
            </div>
        </PanelBase>
    );
};
