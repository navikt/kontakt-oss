import * as React from 'react';
import { RadioPanel } from 'nav-frontend-skjema';
import { Tema } from '../../utils/kontaktskjemaApi';

interface Props {
    tema: Tema;
    onClick: (tema: Tema) => void;
    valgt: boolean;
    className?: string;
}

const Temaknapp: React.FunctionComponent<Props> = props => {
    return (
        <div className={props.className || ''} data-testid="temaknapp">
            <RadioPanel
                onChange={() => props.onClick(props.tema)}
                inputProps={{ className: 'blokk-xs' }}
                name={'alternativ'}
                label={props.tema}
                value={props.tema}
                checked={props.valgt}
            />
        </div>
    );
};

export default Temaknapp;
