import * as yup from 'yup';

export const videoValidationSchema = yup.object().shape({
  file_path: yup.string().required(),
  text_document_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
