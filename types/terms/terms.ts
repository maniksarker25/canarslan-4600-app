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