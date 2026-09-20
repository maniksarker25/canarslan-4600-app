export interface PrivacySection {
  title: string;
  content: string;
  lastUpdated?: string;
}

export interface PrivacyData {
  title: string;
  lastUpdated: string;
  sections: PrivacySection[];
}
