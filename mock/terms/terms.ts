export interface TermsSection {
  title: string;
  content: string;
  lastUpdated?: string;
}

export interface TermsData {
  title: string;
  lastUpdated: string;
  sections: TermsSection[];
}

export const MOCK_TERMS_DATA: TermsData = {
  title: 'Terms & Conditions',
  lastUpdated: '14 July 2025',
  sections: [
    {
      title: '',
      content:
        'By accessing or using the Özen Et wholesale platform, you agree to comply with and be bound by these Terms & Conditions.',
    },
    {
      title: 'Acceptance of Terms',
      content:
        'By using our platform, creating a business account, or placing wholesale orders, you confirm that you have read, understood, and accepted these Terms. If you do not agree, please discontinue using the application.',
    },
    {
      title: 'Business Platform Purpose',
      content:
        'Özen Et provides a digital B2B wholesale platform connecting food businesses, restaurants, hotels, and butchers directly with high-quality meat suppliers. All orders are processed under commercial wholesale supply standards.',
    },
    {
      title: 'User & Business Accounts',
      content:
        'Account holders are responsible for maintaining the confidentiality of their login credentials and for ensuring all business VAT, Tax ID, and delivery address details provided are accurate.',
    },
    {
      title: 'Orders & Pricing',
      content:
        'Wholesale pricing and order minimums are subject to change based on market conditions. Confirmed orders will be fulfilled as per the agreed unit price and estimated delivery schedule.',
    },
    {
      title: 'Quality & Storage Guarantee',
      content:
        'All fresh beef, chicken, lamb, and processed meats are delivered in refrigerated transport under strict food safety and hygiene standards. Customers must inspect deliveries upon arrival.',
    },
    {
      title: 'Payment Terms',
      content:
        'Payments are processed securely via accepted payment methods or pre-approved business credit terms. Invoices will be generated upon order dispatch.',
    },
    {
      title: 'Changes to Terms',
      content:
        'We may update these Terms from time to time. Continued use of the platform after updates indicates acceptance of the revised Terms.',
    },
    {
      title: 'Contact Information',
      content:
        'For questions regarding these Terms, please reach out via the Help & Support section in the app.',
    },
  ],
};
