declare module 'nav-frontend-ikoner-assets' {
    import * as React from 'react';

    interface IconProps {
        height?: number | string;
        width?: number | string;
        kind: IconType;
        size?: number | string;
    }

    type IconType =
        | 'advarsel-sirkel'
        | 'advarsel-trekant'
        | 'advarsel-trekant-fylt'
        | 'alarm'
        | 'alarm-ny'
        | 'arbeidsgiver'
        | 'feil-sirkel-fylt'
        | 'help-circle'
        | 'help-circle_hover'
        | 'info-sirkel'
        | 'info-sirkel-fylt'
        | 'info-sirkel-orange'
        | 'kalender'
        | 'minus';

    export default class Icon extends React.Component<IconProps, {}> {}
}
