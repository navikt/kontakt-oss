import fetchMock from 'fetch-mock';
import { FYLKER_OG_KOMMUNER_PATH } from '../utils/paths';
import kommunerOgBydeler from './kommunerOgBydeler.json';

fetchMock.get(FYLKER_OG_KOMMUNER_PATH, kommunerOgBydeler);