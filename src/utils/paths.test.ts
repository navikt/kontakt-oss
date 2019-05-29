import { FEATURE_TOGGLE_BASEPATH, featureTogglePath } from './paths';

test('featureTogglePath skal sette på features som query params', () => {
    expect(featureTogglePath(['test', 'hello'])).toEqual(
        FEATURE_TOGGLE_BASEPATH + '?feature=test&feature=hello'
    );
});
