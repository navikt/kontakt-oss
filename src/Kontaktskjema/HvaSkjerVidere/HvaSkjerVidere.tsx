import React, { FunctionComponent } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import brevSvg from './brev.svg';
import dameSvg from './nav-dame.svg';
import skiltSvg from './skilt.svg';
import pilSvg from './pil.svg';
import PanelBase from 'nav-frontend-paneler';
import './HvaSkjerVidere.less';
import { BildeMedTekst } from './BildeMedTekst/BildeMedTekst';
import { Tema, TemaType } from '../../utils/kontaktskjemaApi';

interface Props {
    tema?: Tema;
}

// TODO Farge på pil-svg?
// TODO egen tekst for NALS
// TODO Hva skal skje når tema ikke er valgt? Her viser vi bare standardteksten.
export const HvaSkjerVidere: FunctionComponent<Props> = props => {
    const skalViseTeksterForSykefravær =
        !!props.tema && props.tema.type === TemaType.ForebyggeSykefravær;

    const tekster = skalViseTeksterForSykefravær
        ? {
              tekst1:
                  'Henvendelsen blir sendt til NAV Arbeidslivssenter i ditt fylke',
              tekst2:
                  'NAV Arbeidslivssenter ruter den til den på kontoret som best kan svare',
              tekst3:
                  'En NAV-ansatt tar kontakt med deg på telefon eller epost',
          }
        : {
              tekst1: 'Henvendelsen blir sendt til ditt lokale NAV kontor',
              tekst2:
                  'Det lokale kontoret ruter den til den på kontoret som best kan svare',
              tekst3:
                  'En NAV-ansatt tar kontakt med deg på telefon eller e-post',
          };

    return (
        <PanelBase className="hva-skjer-videre">
            <Undertittel>Hva skjer med henvendelsen min?</Undertittel>
            <div className="hva-skjer-videre__steg-wrapper">
                <BildeMedTekst svg={brevSvg} tekst={tekster.tekst1} />
                <img src={pilSvg} alt="" className="hva-skjer-videre__pil" />
                <BildeMedTekst svg={skiltSvg} tekst={tekster.tekst2} />
                <img src={pilSvg} alt="" className="hva-skjer-videre__pil" />
                <BildeMedTekst svg={dameSvg} tekst={tekster.tekst3} />
            </div>
        </PanelBase>
    );
};
