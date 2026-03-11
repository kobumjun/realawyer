export interface Case {
  id: string;
  slug: string;
  title: string;
  description: string;
  content?: string;        // 상세 본문 (keyword-generated)
  keywords: string;
  damageType?: string;     // legacy
  litigationMethod?: string;
  requiredDocs?: string;
  victimType?: string;     // keyword-generated
  lawsuitType?: string;
  documents?: string;
  process: string;
  phone: string;
  status: string;
  tagline?: string;
  createdAt: string;
  updatedAt?: string;
}
