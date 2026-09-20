import { useState } from 'react';
import { FieldsType, FieldType, KeyboardType } from '@/types/Types';

const ForgotPasswordFields = () => {
  const [fields, setFields] = useState<FieldsType[]>([
    {
      name: 'email',
      type: FieldType.STRING,
      placeHolder: 'Enter your email',
      label: 'Email Address',
      error: false,
      value: 'customer@yopmail.com',
      required: true,
      keyboard: KeyboardType.EMAIL_ADDRESS,
    },
  ]);

  return { fields, setFields };
};

export default ForgotPasswordFields;
