import _ from 'lodash';
import { get, post } from './serviceutils';

const formFields = async (formId) => {
  const response = await get('forms/' + formId + '/fields.json');
  let filteredFields = await _.filter(response?.data?.Fields, item => !_.isNil(item.IsRequired) && item.ClassNames !== 'hide');
  return filteredFields;
}

const formInfo = async (formId) => {
  const response = await get('/forms.json');
  const findForm = _.find(response.data.Forms, item => item.Hash === formId);
  return findForm;
}

const entryPost = async (formId, body) => {
  const endpoint = 'forms/' + formId + '/entries.json';
  const response = await post(endpoint, body);
  console.log('RESPONSE -------->>>>>>', JSON.stringify(response.data.FieldErrors));
  return response;
}


export { formFields, formInfo, entryPost }


// https://healthwealth.wufoo.com/api/v3/forms.json