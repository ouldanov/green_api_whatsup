export const ERRORS = {
  REQUIRED: 'Обязательное',
  FORMAT: 'Недопустимый формат',
  LENGTH: (length: number) => `Не более ${length} символов`,
};

export const FIELD_VALIDATION = {
  PHONE: {
    value: /^7\d{10}$/,
    message: ERRORS.FORMAT,
  },
  LENGTH: (v: string, length: number) => v.length < length || ERRORS.LENGTH(length),
};
