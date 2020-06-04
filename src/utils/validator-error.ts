import { ValidationError } from 'yup';

export interface ValidatorErrorsProps {
  [key: string]: string;
}

export const getValidatorError = (
  err: ValidationError,
): ValidatorErrorsProps => {
  const errors: ValidatorErrorsProps = {};

  err.inner.forEach((error) => {
    errors[error.path] = error.message;
  });
  return errors;
};
