import fetchMock from 'fetch-mock';
import {
    FEATURE_TOGGLE_BASEPATH,
    FYLKER_OG_KOMMUNER_PATH,
    SEND_KONTAKTSKJEMA_PATH,
} from '../utils/paths';
import fylkesinndeling from './fylkesinndeling.json';
import { FeatureToggle, FeatureToggles } from '../KontaktOss/FeatureTogglesProvider';

fetchMock.get(FYLKER_OG_KOMMUNER_PATH, fylkesinndeling);

const featureToggleResponse: FeatureToggles = {
    [FeatureToggle.NyttUtseendeFeature]: false
};

fetchMock.get('begin:' + FEATURE_TOGGLE_BASEPATH, featureToggleResponse);

fetchMock.post(SEND_KONTAKTSKJEMA_PATH, { status: 200, body: {} });
