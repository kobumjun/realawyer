-- Run this in Supabase SQL Editor to create the cases table

CREATE TABLE IF NOT EXISTS cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  content TEXT,
  keywords TEXT NOT NULL DEFAULT '',
  damage_type TEXT,
  litigation_method TEXT,
  required_docs TEXT,
  victim_type TEXT,
  lawsuit_type TEXT,
  documents TEXT,
  process TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '1588-0000',
  status TEXT NOT NULL DEFAULT '접수진행중',
  tagline TEXT,
  created_at TEXT NOT NULL DEFAULT ''
);

-- Optional: seed initial cases (run after schema)
-- INSERT INTO cases (id, slug, title, description, keywords, damage_type, litigation_method, required_docs, process, phone, status, tagline, created_at) VALUES
-- ('1', 'luna-crypto-fraud', '루나(LUNA) 암호화폐 투자사기 단체소송', '테라·루나 붕괴로 인한 투자 손실 피해자를 위한 단체소송입니다...', '루나,테라,LUNA,암호화폐,가상자산', '가상자산 투자 손실, 과대광고 피해', '손해배상 청구 소송, 단체소송', '거래내역서, 입출금 내역, 신분증 사본', '1) 상담 접수 2) 서류 검토 3) 참여 의사 확인 4) 소송 제기 5) 판결 및 집행', '1588-1234', '접수진행중', '루나 피해 1차 단체소송 진행중', '2024-01-15'),
-- ... (add remaining 7 from data/cases.json)
