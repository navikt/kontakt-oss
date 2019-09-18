import * as React from 'react';
import { FunctionComponent } from 'react';
import { Tema, temaer } from '../../utils/kontaktskjemaApi';
import { logEvent, mapTilTemaEvent } from '../../utils/metricsUtils';
import { Element } from 'nav-frontend-typografi';
import Temaknapp from './Temaknapp';

interface Props {
    velgTema: (tema: Tema) => void;
    valgtTema?: Tema;
}

export const Temavalg: FunctionComponent<Props> = props => {
    const onVelgTema = (tema: Tema) => {
        props.velgTema(tema);
        logEvent(`kontakt-oss.tema.${mapTilTemaEvent(tema)}`);
    };

    const temaknapper = temaer.map(tema => (
        <Temaknapp
            key={tema.type}
            tema={tema}
            onClick={onVelgTema}
            valgt={tema === props.valgtTema}
            className="temaknapp"
        />
    ));

    return (
        <div className="temavalg">
            <Element className="temavalg__label">
                Hva gjelder det?
            </Element>
            <div className="temavalg__wrapper">{temaknapper}</div>
        </div>
    );
};
