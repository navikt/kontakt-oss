import React from 'react';
import './Banner.less';
import { Sidetittel } from 'nav-frontend-typografi';
import defaultIllustrasjon from './bannerIllustrasjon.svg';

interface Props {
    tekst: string;
    illustrasjon?: any;
    illustrasjonAltTekst?: string;
}

const Banner: React.FunctionComponent<Props> = props => {
    return (
        <div className="banner">
            <div className="banner__innhold">
                <Sidetittel className="banner__tekst">{props.tekst}</Sidetittel>
                <img
                    className="banner__illustrasjon"
                    src={props.illustrasjon || defaultIllustrasjon}
                    alt={props.illustrasjonAltTekst || ''}
                />
            </div>
        </div>
    );
};

export default Banner;
