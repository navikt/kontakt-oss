import fetchMock from 'fetch-mock';
import {
    FEATURE_TOGGLE_BASEPATH,
    KOMMUNER_PATH,
    SEND_KONTAKTSKJEMA_PATH,
} from '../utils/paths';
import fylkesinndeling from './fylkesinndeling.json';
import { FeatureToggles } from '../providers/FeatureTogglesProvider';

fetchMock.get(KOMMUNER_PATH, fylkesinndeling);

const featureToggleResponse: FeatureToggles = {};

fetchMock.get('begin:' + FEATURE_TOGGLE_BASEPATH, featureToggleResponse);

fetchMock.post(SEND_KONTAKTSKJEMA_PATH, { status: 200, body: {} });
