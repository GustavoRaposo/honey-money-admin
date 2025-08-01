export const validators = {
  required: (value: any): string | undefined => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'Este campo é obrigatório';
    }
    return undefined;
  },

  email: (value: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      return 'Email inválido';
    }
    return undefined;
  },

  minLength: (min: number) => (value: string): string | undefined => {
    if (value && value.length < min) {
      return `Deve ter pelo menos ${min} caracteres`;
    }
    return undefined;
  },

  confirmPassword: (password: string) => (confirmPassword: string): string | undefined => {
    if (confirmPassword && confirmPassword !== password) {
      return 'As senhas não coincidem';
    }
    return undefined;
  },

  minimumAge: (minAge: number) => (birthDate: string): string | undefined => {
    if (!birthDate) return undefined;

    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      const actualAge = age - 1;
      if (actualAge < minAge) {
        return `Você deve ter pelo menos ${minAge} anos`;
      }
    } else if (age < minAge) {
      return `Você deve ter pelo menos ${minAge} anos`;
    }

    return undefined;
  },

  maxLength: (max: number) => (value: string): string | undefined => {
    if (value && value.length > max) {
      return `Deve ter no máximo ${max} caracteres`;
    }
    return undefined;
  },

  stateCode: (value: string): string | undefined => {
    if (value && value.length !== 2) {
      return 'Estado deve ter 2 caracteres (ex: SP, RJ)';
    }
    return undefined;
  },

  futureDate: (value: string): string | undefined => {
    if (value) {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate > today) {
        return 'Data não pode ser no futuro';
      }
    }
    return undefined;
  },
  
  minValue: (min: number) => (value: number) =>
    value < min ? `O valor mínimo é ${min}` : undefined,
};

export const validateField = (value: any, validations: Array<(value: any) => string | undefined>): string | undefined => {
  for (const validation of validations) {
    const error = validation(value);
    if (error) {
      return error;
    }
  }
  return undefined;
};

export const validateForm = <T extends Record<string, any>>(
  values: T,
  rules: Partial<Record<keyof T, Array<(value: any) => string | undefined>>>
): Partial<Record<keyof T, string>> => {
  const errors: Partial<Record<keyof T, string>> = {};

  Object.keys(rules).forEach((key) => {
    const fieldKey = key as keyof T;
    const fieldRules = rules[fieldKey];
    if (fieldRules) {
      const error = validateField(values[fieldKey], fieldRules);
      if (error) {
        errors[fieldKey] = error;
      }
    }
  });

  return errors;
};