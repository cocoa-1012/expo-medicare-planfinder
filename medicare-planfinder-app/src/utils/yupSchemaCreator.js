import * as yup from 'yup';
import _ from 'lodash';

const requiredText = 'This field is a required field!'
const stringValidationText = 'This field must be a string!';
const numberValidationText = 'This field must be a number!';

const createYupSchema = (formFields) => {
  let schemaJson = {};
  let formikFields = {};
  let subFields;
  let yupConfig;
  for (var key in formFields) {
    const range = formFields[key].ClassNames && JSON.parse(formFields[key].ClassNames)?.range;
    if (formFields[key].IsRequired) {
      switch (formFields[key].Type) {
        case 'select':
          formikFields[formFields[key].ID] = !_.isEmpty(formFields[key].DefaultVal) ? formFields[key].DefaultVal : '';
          schemaJson[formFields[key].ID] = formFields[key].IsRequired === '1' ? yup.string(stringValidationText).required(requiredText) : yup.string(stringValidationText);
          break;
        case 'text':
          formikFields[formFields[key].ID] = !_.isEmpty(formFields[key].DefaultVal) ? formFields[key].DefaultVal : '';
          if (range) {
            schemaJson[formFields[key].ID] = formFields[key].IsRequired === '1' ? yup.string(stringValidationText).min(range.min, `Should be entry min: ${range.min}`).max(range.max, `Should be entry max: ${range.min}`).required(requiredText) : yup.string(stringValidationText).min(range.min, `Should be entry min: ${range.min}`).max(range.max, `Should be entry max: ${range.max}`);
          } else {
            schemaJson[formFields[key].ID] = formFields[key].IsRequired === '1' ? yup.string(stringValidationText).required(requiredText) : yup.string(stringValidationText);
          }
          break;
        case 'shortname':
          subFields = {};
          yupConfig = formFields[key].IsRequired === '1' ? yup.string(stringValidationText).required(requiredText) : yup.string();
          _.each(formFields[key].SubFields, item => {
            subFields[item.ID] = '';
            formikFields[item.ID] = !_.isEmpty(item.DefaultVal) ? item.DefaultVal : '';
            schemaJson[item.ID] = yupConfig;
          })
          break;
        case 'date':
          formikFields[formFields[key].ID] = !_.isEmpty(formFields[key].DefaultVal) ? formFields[key].DefaultVal : '';
          schemaJson[formFields[key].ID] = formFields[key].IsRequired === '1' ? yup.string(stringValidationText).required(requiredText) : yup.string(stringValidationText);
          break;
        case 'address':
          let nonRequiredAreas = !_.isEmpty(formFields[key].ClassNames) ? JSON.parse(formFields[key].ClassNames)?.nonRequiredAreas : null;
          subFields = {};
          _.each(formFields[key].SubFields, item => {
            formikFields[item.ID] = !_.isEmpty(item.DefaultVal) ? item.DefaultVal : '';
            schemaJson[item.ID] = formFields[key].IsRequired === '1' && !_.includes(nonRequiredAreas, item.ID) ? yup.string(stringValidationText).required(requiredText) : yup.string(stringValidationText);
          })
          break;
        case 'phone':
          formikFields[formFields[key].ID] = !_.isEmpty(formFields[key].DefaultVal) ? formFields[key].DefaultVal : '';
          if (range) {
            schemaJson[formFields[key].ID] = formFields[key].IsRequired === '1' ? yup.string(stringValidationText).min(range.min, `Should be entry min: ${range.min}`).required(requiredText) : yup.string(stringValidationText).min(range.min, `Should be entry min: ${range.min}`);
          } else {
            schemaJson[formFields[key].ID] = formFields[key].IsRequired === '1' ? yup.string(stringValidationText).required(requiredText) : yup.string(stringValidationText);
          }
          break;
        case 'email':
          formikFields[formFields[key].ID] = !_.isEmpty(formFields[key].DefaultVal) ? formFields[key].DefaultVal : '';
          schemaJson[formFields[key].ID] = formFields[key].IsRequired === '1' ? yup.string(stringValidationText).email().required(requiredText) : yup.string(stringValidationText).email();
          break;
        case 'time':
          formikFields[formFields[key].ID] = !_.isEmpty(formFields[key].DefaultVal) ? formFields[key].DefaultVal : '';
          schemaJson[formFields[key].ID] = formFields[key].IsRequired === '1' ? yup.string(stringValidationText).required(requiredText) : yup.string(stringValidationText);
          break;
        case 'checkbox':
          subFields = {};
          _.each(formFields[key].SubFields, item => {
            formikFields[item.ID] = !_.isEmpty(item?.DefaultVal) && item?.DefaultVal !== '0' ? item?.DefaultVal : '';
            schemaJson[item.ID] = yup.string();
          })
          schemaJson[formFields[key].ID + 'Obj'] = formFields[key].IsRequired === '1' ? yup.object().required(requiredText) : yup.object();
          formikFields[formFields[key].ID + 'Obj'] = null;
          break;
        case 'radio':
          formikFields[formFields[key].ID] = !_.isEmpty(formFields[key].DefaultVal) ? formFields[key].DefaultVal : '';
          formikFields[formFields[key].ID + 'temp2'] = '';
          schemaJson[formFields[key].ID] = formFields[key].IsRequired === '1' ? yup.string(stringValidationText).required(requiredText) : yup.string(stringValidationText);
          schemaJson[formFields[key].ID + 'temp2'] = yup.string(stringValidationText).when(formFields[key].ID, {
            is: (val) => val === 'Other' || val === "If Yes, please provide their name & phone number." || val === "Yes, this amount on an annual basis." || val === "If Yes, which one?",
            then: yup.string().required(requiredText)
          });
          break;
        case 'number':
          formikFields[formFields[key].ID] = !_.isEmpty(formFields[key].DefaultVal) ? formFields[key].DefaultVal : '';
          schemaJson[formFields[key].ID] = formFields[key].IsRequired === '1' ? yup.number(numberValidationText).required(requiredText) : yup.number(numberValidationText);
          break;
        case 'textarea':
          formikFields[formFields[key].ID] = !_.isEmpty(formFields[key].DefaultVal) ? formFields[key].DefaultVal : '';
          schemaJson[formFields[key].ID] = formFields[key].IsRequired === '1' ? yup.string(stringValidationText).required(requiredText) : yup.string(stringValidationText);
          break;
        default:
          break;
      }
    }
  }
  schemaJson = yup.object().shape(schemaJson);
  return { schemaJson, formikFields };
}

export { createYupSchema }