import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FieldsType, FieldType, KeyboardType } from '@/types/Types';

const SignUpFields = () => {
  const [fields, setFields] = useState<FieldsType[]>([
    // {
    //   name: 'name',
    //   type: FieldType.STRING,
    //   placeHolder: 'Enter Full Name',
    //   label: 'Full Name',
    //   error: false,
    //   value: 'rasel',
    //   required: true,
    //   keyboard: KeyboardType.DEFAULT,
    // },

    {
      name: 'firstName',
      type: FieldType.STRING,
      placeHolder: 'First Name',
      label: 'First Name',
      error: false,
      value: 'Rasel',
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },

    {
      name: 'lastName',
      type: FieldType.STRING,
      placeHolder: 'Last Name',
      label: 'Last Name',
      error: false,
      value: 'Ahmed',
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },

    {
      name: 'email',
      type: FieldType.STRING,
      placeHolder: 'Enter Email Address',
      label: 'Email Address',
      error: false,
      value: 'mdraselahmed.code@gmail.com',
      required: true,
      keyboard: KeyboardType.EMAIL_ADDRESS,
    },
    {
      name: 'phone',
      type: FieldType.STRING,
      placeHolder: 'Enter Phone Number',
      label: 'Phone Number',
      error: false,
      value: '1234567890',
      required: true,
      keyboard: KeyboardType.PHONE_PAD,
    },
    {
      name: 'password',
      type: FieldType.PASSWORD,
      placeHolder: '******',
      label: 'Password',
      error: false,
      value: '123456',
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: 'confirmPassword',
      type: FieldType.PASSWORD,
      placeHolder: '******',
      label: 'Confirm Password',
      error: false,
      value: '123456',
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: 'agree',
      type: FieldType.CHECKBOX,
      label: 'I agree to the terms and conditions',
      value: false, // must be boolean
      error: false,
      required: true,
      keyboard: KeyboardType.ASCII_CAPABLE,
      placeHolder: '',
    },
    // {
    //   name: 'address',
    //   type: FieldType.LOCATION,
    //   placeHolder: 'Enter Address',
    //   label: 'Address',
    //   error: false,
    //   value: '123 Main St, Anytown, USA',
    //   required: true,
    //   keyboard: KeyboardType.DEFAULT,
    // },
    // {
    //   name: 'referralCode',
    //   type: FieldType.STRING,
    //   placeHolder: 'Enter Referral Code (Optional)',
    //   label: 'Referral Code (Optional)',
    //   error: false,
    //   value: '',
    //   required: false,
    //   keyboard: KeyboardType.DEFAULT,
    // },

    // {
    //   name: 'zipCode',
    //   type: FieldType.STRING,
    //   placeHolder: 'Enter ZIP Code',
    //   label: 'ZIP Code',
    //   error: false,
    //   value: '737323',
    //   required: true,
    //   keyboard: KeyboardType.NUMBER_PAD,
    // },

    {
      name: 'latitude',
      type: FieldType.NUMBER,
      error: false,
      value: 0,
      required: false,
      keyboard: KeyboardType.NUMERIC,
    },
    {
      name: 'longitude',
      type: FieldType.NUMBER,
      error: false,
      value: 0,
      required: false,
      keyboard: KeyboardType.NUMERIC,
    },
  ]);
  return { fields, setFields };
};

export default SignUpFields;

const styles = StyleSheet.create({});
