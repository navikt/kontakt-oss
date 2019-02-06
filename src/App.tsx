import * as React from 'react';
import './App.less';
import { BrowserRouter, Route } from 'react-router-dom';
import KontaktOss from './KontaktOss/KontaktOss';
import { FeatureTogglesProvider } from './KontaktOss/FeatureTogglesProvider';

class App extends React.Component {
    render() {
        return (
            <FeatureTogglesProvider>
                <BrowserRouter>
                    {/* TODO: Velg path */}
                    <Route exact={true} path="/" component={KontaktOss} />
                </BrowserRouter>
            </FeatureTogglesProvider>
        );
    }
}

export default App;
