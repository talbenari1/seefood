import request from 'superagent'

const PROJECT_ID = '322976eb-9ab1-4e99-8d84-f2e99a71d765'
const TRAINING_KEY = '2db255846d014d05917cd9c66a6816c8'
const PREDICTION_KEY = 'e84dd580648b460cb931f9924ace2cb8'

/**
 * Generate an API URL given an endpoint and an optional iteration ID.
 * @param {string} endpoint 
 * @param {*} iterationId 
 */
const genURL = (endpoint, iterationId) =>
  `https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/${PROJECT_ID}/${endpoint}${iterationId ? '?iterationId=' + iterationId : ''}`

/**
 * Predict an image given its URL.
 * @param {*} url 
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
