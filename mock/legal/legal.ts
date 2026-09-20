// /mock/legal.ts
import { LegalInfoData } from "@/types/legal/legal";

export const MOCK_LEGAL_INFO: LegalInfoData = {
  title: 'Legal & Company Info',
  sections: [
    {
      label: 'Company Name',
      value: 'SnowOut Inc.',
    },
    {
      label: 'Business Type',
      value: 'Technology Platform',
    },
    {
      label: 'Registered Address',
      value: '2248 Broadway # 2010, New York, NY 10024',
    },
    {
      label: 'Contact Email',
      value: 'support@snowout.com',
    },
    {
      label: 'Jurisdiction',
      value: 'United States',
    },
    {
      label: 'Official Website',
      value: 'http://www.SnowOut.com',
      isLink: true,
    },
  ],
};