import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import Temaknapp from './Temaknapp';
import { logEvent, mapTilTemaEvent } from '../../utils/metricsUtils';
import { Tema } from '../../utils/kontaktskjemaApi';
import './Temaknapper.less';

interface Props {
    velgTema: (tema: Tema) => void;
    valgtTema?: Tema;
}

const Temaknapper: React.SFC<Props> = props => {
    const alleTema: Tema[] = [
        'Rekruttering',
        'Rekruttering med tilrettelegging',
        'Arbeidstrening',
        'Oppfølging av en arbeidstaker',
        'Annet',
    ];

    const onVelgTema = (tema: Tema) => {
        props.velgTema(tema);
        logEvent(`kontakt-oss.tema.${mapTilTemaEvent(tema)}`);
    };

    const temaKnapper = alleTema.map(tema => (
        <Temaknapp
            key={tema}
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
