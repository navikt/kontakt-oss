import * as React from 'react';
import { FunctionComponent } from 'react';
import {
    Tema,
    temaerForNyttKontaktskjema,
    TemaType,
} from '../../utils/kontaktskjemaApi';
import { logEvent, mapTilTemaEvent } from '../../utils/metricsUtils';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Temaknapp from './Temaknapp';

import './Temavalg.less';
import infosirkel from './info-sirkel-fyll.svg';

interface Props {
    velgTema: (tema: Tema) => void;
    valgtTemaType: TemaType | '';
}

export const Temavalg: FunctionComponent<Props> = props => {
    const onVelgTema = (tema: Tema) => {
        props.velgTema(tema);
        logEvent(`kontakt-oss.tema.${mapTilTemaEvent(tema)}`);
    };

    const temaknapper = temaerForNyttKontaktskjema.map(tema => {
        return (
            <Temaknapp
                key={tema.type}
                tema={tema}
                onClick={onVelgTema}
                valgt={tema.type === props.valgtTemaType}
                className="temaknapp"
            />
        );
    });

    return (
        <div className="temavalg">
            <Undertittel className="temavalg__label">
                Hva gjelder det?
            </Undertittel>
            <div className="temavalg__wrapper">{temaknapper}</div>
            <div className="temavalg__infotekst">
                <img className="temavalg__infotekst-ikon" src={infosirkel} />
                <Normaltekst>
                    For andre henvendelser ber vi deg kontakte
                    arbeidsgivertelefonen på{' '}
                    <a href={'tel:+4755553336'} className={'lenke'}>
                        55&nbsp;55&nbsp;33&nbsp;36
                    </a>
                </Normaltekst>
            </div>
        </div>
    );
};
