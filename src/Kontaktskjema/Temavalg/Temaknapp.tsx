import * as React from 'react';
import { Tema } from '../../utils/kontaktskjemaApi';
import { RadioPanel } from 'nav-frontend-skjema';

interface Props {
    tema: Tema;
    onClick: (tema: Tema) => void;
    valgt: boolean;
    className?: string;
}

const Temaknapp: React.FunctionComponent<Props> = (props) => {
    return (
        <div className={props.className || ''} data-testid="temaknapp">
            <RadioPanel
                onChange={() => props.onClick(props.tema)}
                name={'alternativ'}
                label={props.tema.tekst}
                value={props.tema.tekst}
                checked={props.valgt}
            />
        </div>
    );
};

export default Temaknapp;
