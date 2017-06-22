import request from 'superagent'
import { PROJECT_ID, PREDICTION_KEY } from '../config'

/**
 * Generate an API URL given an endpoint and an optional iteration ID.
 * @param {string} endpoint - the API endpoint to connect to.
 * @param {string} [iterationId] - the training iteration to use for predictions.
 */
const genURL = (endpoint, iterationId) =>
  `https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/${PROJECT_ID}/${endpoint}${iterationId ? '?iterationId=' + iterationId : ''}`

/**
 * Predict an image given its URL.
 * @param {string} url the URL pointing to the image
 */
export const predictURL = url => request.post(genURL('url', '09a8f88a-04bf-4108-bef1-ea51e98e6113'))
  .send({ 'Url': url })
  .set('Prediction-Key', PREDICTION_KEY)
  .set('Content-Type', 'application/json')

/**
 * Predict an image given the image itself (file upload).
 * @param {string} file the image file data
 */
export const predictFile = file => request.post(genURL('image'))
  .send(file)
  .set('Prediction-Key', PREDICTION_KEY)
  .set('Content-Type', 'application/octet-stream')
