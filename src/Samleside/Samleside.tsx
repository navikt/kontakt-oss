import * as React from 'react';
import { FunctionComponent } from 'react';
import { GenerelleHenvendelser } from './GenerelleHenvendelser/GenerelleHenvendelser';
import './Samleside.less';
import { AndreKontaktpunkter } from './AndreKontaktpunkter/AndreKontaktpunkter';

export const Samleside: FunctionComponent = () => {
    return (
        <div className="samleside">
            <GenerelleHenvendelser />
            <AndreKontaktpunkter />
        </div>
    );
};
