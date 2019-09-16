import * as React from 'react';
import { FunctionComponent } from 'react';
import './AndreKontaktpunkter.less';
import { RekrutteringOgInkludering } from './RekrutteringOgInkludering';

export const AndreKontaktpunkter: FunctionComponent = () => {
    return (
        <div>
            <RekrutteringOgInkludering />
            <RekrutteringOgInkludering />
            <RekrutteringOgInkludering />
        </div>
    );
};
