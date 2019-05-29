import { FEATURE_TOGGLE_BASEPATH, featureTogglePath } from './paths';
import { FeatureToggle } from '../KontaktOss/FeatureTogglesProvider';

test('featureTogglePath skal sette på features som query params', () => {
    expect(featureTogglePath(['test', 'hello'])).toEqual(
        FEATURE_TOGGLE_BASEPATH + '/feature=test&featurde=hello'
    );
});