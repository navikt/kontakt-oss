import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import Temaknapp from './Temaknapp';
import { logEvent, mapTilTemaEvent } from '../../utils/metricsUtils';
import { Tema, temaer } from '../../utils/kontaktskjemaApi';
import './Temaknapper.less';

interface Props {
    velgTema: (tema: Tema) => void;
    valgtTema?: Tema;
}

const Temaknapper: React.FunctionComponent<Props> = props => {
    const onVelgTema = (tema: Tema) => {
        props.velgTema(tema);
        logEvent(`kontakt-oss.tema.${mapTilTemaEvent(tema)}`);
    };

    const temaKnapper = temaer.map(tema => (
        <Temaknapp
            key={tema.type}
            tema={tema}
            onClick={onVelgTema}
            valgt={tema === props.valgtTema}
            className="temaknapp"
        />
    ));

    return (
        <div className="temaknapper">
            <Element className="temaknapper__label">
                Hva gjelder henvendelsen?
            </Element>
            <div className="temaknapper__wrapper">{temaKnapper}</div>
        </div>
    );
};

export default Temaknapper;
