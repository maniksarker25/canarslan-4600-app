// components/formFields/ProfileSetupFields.ts
import { useState } from 'react';
import { FieldsType, FieldType, KeyboardType } from '@/types/Types';

const ProfileSetupFields = () => {
  const [fields, setFields] = useState<FieldsType[]>([
    {
      name: 'businessType',
      type: FieldType.SELECT,
      placeHolder: 'Select business type',
      label: 'Business Type',
      error: false,
      value: 'restaurant', // 👈 Default value set
      required: true,
      keyboard: KeyboardType.DEFAULT,
      options: [
        { label: 'Restaurant', value: 'restaurant' },
        { label: 'Cafe', value: 'cafe' },
        { label: 'Supermarket / Grocery', value: 'supermarket' },
        { label: 'Butcher Shop', value: 'butcher' },
        { label: 'Distributor / Wholesaler', value: 'distributor' },
        { label: 'Catering Company', value: 'catering' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'companyName',
      type: FieldType.STRING,
      placeHolder: 'Bosphorus Restaurant LLC',
      label: 'Company Name',
      error: false,
      value: 'Bosphorus Restaurant LLC', // 👈 Default value set
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: 'businessAddress',
      type: FieldType.STRING,
      placeHolder: '42 Hudson St, New York, NY',
      label: 'Business Address',
      error: false,
      value: '42 Hudson St, New York, NY', // 👈 Default value set
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: 'vatTaxId',
      type: FieldType.STRING,
      placeHolder: 'US-1234567890',
      label: 'VAT / Tax ID',
      error: false,
      value: 'US-1234567890', // 👈 Default value set
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
  ]);
  return { fields, setFields };
};

export default ProfileSetupFields;
