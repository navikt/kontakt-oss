import * as React from 'react';
import { FunctionComponent } from 'react';
import './AndreKontaktpunkter.less';
import { RekrutteringOgInkludering } from './RekrutteringOgInkludering';
import { OppfølgingEnkeltperson } from './OppfølgingEnkeltperson';
import { ForebyggeSykefravær } from './ForebyggeSykefravær';

export const AndreKontaktpunkter: FunctionComponent = () => {
    return (
        <div className="andre-kontaktpunkter">
            <RekrutteringOgInkludering/>
            <OppfølgingEnkeltperson/>
            <ForebyggeSykefravær/>
        </div>
    );
};
