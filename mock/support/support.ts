export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const MOCK_FAQS: FAQItem[] = [
  {
    id: '1',
    question: 'How do I track my order?',
    answer:
      'You can track your order in real-time from the Orders screen. Tap on any active order to view its status and live delivery location.',
  },
  {
    id: '2',
    question: 'Can I cancel my order?',
    answer:
      'You can cancel your order before the restaurant starts preparing it. Go to Orders → Order Details → Cancel Order.',
  },
  {
    id: '3',
    question: 'What if items are missing or wrong?',
    answer:
      'If any items are missing or incorrect, please use the contact form above or reach out to support within 24 hours for a resolution or refund.',
  },
  {
    id: '4',
    question: 'How do refunds work?',
    answer:
      'Refunds are automatically processed to your original payment method within 3-5 business days after request approval.',
  },
  {
    id: '5',
    question: 'How do I change my delivery address?',
    answer:
      'You can update your delivery address before placing an order, or contact support immediately if the order is already placed.',
  },
  {
    id: '6',
    question: 'Is there a minimum order amount?',
    answer:
      'Minimum order amounts depend on the specific store or restaurant. Check the checkout screen for details.',
  },
  {
    id: '7',
    question: 'How do I apply a promo code?',
    answer:
      'Enter your promo code on the checkout screen in the "Promo Code" field before finalizing your payment.',
  },
];