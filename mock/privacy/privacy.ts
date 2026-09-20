import { PrivacyData } from '@/types/privacy/privacy';

export const MOCK_PRIVACY_DATA: PrivacyData = {
  title: 'Privacy Policy',
  lastUpdated: '14 July 2025',
  sections: [
    {
      title: '',
      content:
        'Your privacy is important to us. This Privacy Policy explains how Özen Et collects, uses, and protects your information when using our mobile application and B2B wholesale services.',
    },
    {
      title: 'Information We Collect',
      content:
        'We collect business information such as company name, contact person details, email address, phone number, VAT / Tax ID, and delivery addresses when you set up your Özen Et account.',
    },
    {
      title: 'Use of Information',
      content:
        'The information collected is used to process wholesale orders, arrange cold-chain delivery logistics, issue commercial invoices, improve platform services, and communicate order updates.',
    },
    {
      title: 'Data Storage and Protection',
      content:
        'We implement strict technical and organizational security measures to protect your account and transaction data against unauthorized access, loss, or alteration.',
    },
    {
      title: 'Sharing of Information',
      content:
        'We do not sell or rent business data to third parties. Information is shared only with logistics partners and secure payment gateways necessary for order fulfillment.',
    },
    {
      title: 'Your Rights',
      content:
        'You may update your profile and business details at any time in the app or request data account modifications via the Help & Support center.',
    },
    {
      title: 'Changes to Policy',
      content:
        'This policy may be updated periodically to reflect changes in our services or legal requirements.',
    },
  ],
};
