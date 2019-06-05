import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import Temaknapp from './Temaknapp';
import { logEvent, mapTilTemaEvent } from '../../utils/metricsUtils';
import { Tema, temaer, TemaType } from '../../utils/kontaktskjemaApi';
import './Temaknapper.less';
import {
    FeatureToggle,
    FeatureToggles,
    medFeatureToggles,
} from '../FeatureTogglesProvider';

interface Props {
    velgTema: (tema: Tema) => void;
    valgtTema?: Tema;
}

const Temaknapper: React.FunctionComponent<Props & FeatureToggles> = props => {
    const onVelgTema = (tema: Tema) => {
        props.velgTema(tema);
        logEvent(`kontakt-oss.tema.${mapTilTemaEvent(tema)}`);
    };

    const temaKnapper = temaer
        .filter(
            // TODO Feature toggle for IA-valget; fjernes på sikt
            tema =>
                props[FeatureToggle.ForebyggeSykefraværFeature] ||
                !(tema.type === TemaType.ForebyggeSykefravær)
        )
        .map(tema => (
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

export default medFeatureToggles(Temaknapper);
