import { useState } from 'react';

interface UseFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void> | void;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  handleChange: (name: keyof T, value: any) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setFieldError: (name: keyof T, error: string) => void;
  clearErrors: () => void;
}

export function useForm<T extends Record<string, any>>(props: UseFormProps<T>): UseFormReturn<T> {
  const { initialValues, onSubmit, validate } = props;
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // Limpar erro do campo quando o usuÃ¡rio comeÃ§ar a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar formulÃ¡rio
    if (validate) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Erro no formulÃ¡rio:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const setFieldError = (name: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldError,
    clearErrors,
  };
}
