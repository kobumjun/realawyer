import type { Case } from "./types";
import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";

// Load initial cases from JSON (bundled at build)
import initialCasesData from "@/data/cases.json";

const RUNTIME_FILE = path.join(process.cwd(), "data", "runtime-cases.json");

function loadRuntimeCases(): Case[] {
  try {
    if (existsSync(RUNTIME_FILE)) {
      const data = readFileSync(RUNTIME_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // fallback on read error
  }
  return [];
}

function saveRuntimeCases(cases: Case[]): void {
  try {
    writeFileSync(RUNTIME_FILE, JSON.stringify(cases, null, 2), "utf-8");
  } catch {
    // persist failed (e.g. read-only filesystem on Vercel)
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

const CASE_TEMPLATES = [
  (k: string) => `${k} 투자 과정에서 발생한 손실과 관련하여 피해자 공동 대응이 진행되고 있습니다.`,
  (k: string) => `${k} 투자 피해 사례가 접수되어 법률 대응 절차가 검토되고 있습니다.`,
  (k: string) => `${k} 관련 투자 피해자들의 공동 대응이 준비되고 있습니다.`,
  (k: string) => `${k} 투자 과정에서 발생한 금전적 피해에 대해 법적 대응이 검토되고 있습니다.`,
  (k: string) => `${k} 투자 사기 의혹 사건과 관련하여 피해자 공동 대응이 진행 중입니다.`,
  (k: string) => `${k} 투자 피해 사건에 대한 법률 검토가 진행되고 있습니다.`,
  (k: string) => `${k} 프로젝트 투자 피해 사례가 접수되어 대응 절차가 준비되고 있습니다.`,
  (k: string) => `${k} 투자 과정에서 발생한 손실과 관련된 사건 검토가 진행 중입니다.`,
  (k: string) => `${k} 관련 투자 피해 신고 사례를 바탕으로 법률 대응이 검토되고 있습니다.`,
  (k: string) => `${k} 투자 피해 사건에 대해 공동 대응 절차가 진행되고 있습니다.`,
  (k: string) => `${k} 상장폐지 이후 발생한 투자 손실 피해에 대해 법적 대응이 검토되고 있습니다.`,
  (k: string) => `${k} 상장폐지로 인한 투자 피해 사례가 접수되어 사건 검토가 진행 중입니다.`,
  (k: string) => `${k} 상장폐지 이후 투자자 피해와 관련된 대응 절차가 준비되고 있습니다.`,
  (k: string) => `${k} 상장폐지로 인해 발생한 투자 손실 사건이 접수되었습니다.`,
  (k: string) => `${k} 상장폐지와 관련된 투자 피해자 공동 대응이 검토되고 있습니다.`,
  (k: string) => `${k} 펀드 투자 과정에서 발생한 피해 사례가 접수되었습니다.`,
  (k: string) => `${k} 펀드 투자 손실과 관련된 법률 대응이 준비되고 있습니다.`,
  (k: string) => `${k} 펀드 투자 피해 사건에 대한 법률 검토가 진행 중입니다.`,
  (k: string) => `${k} 펀드 투자 피해와 관련된 공동 대응 절차가 검토되고 있습니다.`,
  (k: string) => `${k} 펀드 투자 과정에서 발생한 손실 피해 사건이 접수되었습니다.`,
  (k: string) => `${k} 암호화폐 투자 피해 사례가 접수되어 사건 검토가 진행 중입니다.`,
  (k: string) => `${k} 암호화폐 투자 사기 의혹 사건에 대한 법률 대응이 준비되고 있습니다.`,
  (k: string) => `${k} 가상자산 투자 피해 사건에 대한 공동 대응 절차가 검토되고 있습니다.`,
  (k: string) => `${k} 코인 투자 손실 피해와 관련된 법률 검토가 진행 중입니다.`,
  (k: string) => `${k} 암호화폐 투자 피해와 관련된 사건 대응이 준비되고 있습니다.`,
  (k: string) => `${k} 플랫폼 투자 피해 사례가 접수되어 법률 검토가 진행 중입니다.`,
  (k: string) => `${k} 플랫폼 투자 사기 의혹 사건에 대한 공동 대응이 준비되고 있습니다.`,
  (k: string) => `${k} 플랫폼 투자 피해와 관련된 사건 대응 절차가 진행 중입니다.`,
  (k: string) => `${k} 플랫폼 투자 피해 사건에 대한 법률 대응이 검토되고 있습니다.`,
  (k: string) => `${k} 플랫폼 투자 손실 피해와 관련된 공동 대응 절차가 준비되고 있습니다.`,
  (k: string) => `${k} 투자 사기 피해 사건이 접수되어 사건 검토가 진행되고 있습니다.`,
  (k: string) => `${k} 투자 피해 사례와 관련된 법률 대응이 준비되고 있습니다.`,
  (k: string) => `${k} 투자 피해 사건에 대한 공동 대응 절차가 검토되고 있습니다.`,
  (k: string) => `${k} 투자 손실 피해와 관련된 사건 대응이 준비되고 있습니다.`,
  (k: string) => `${k} 투자 피해 사건에 대해 법률 검토가 진행 중입니다.`,
  (k: string) => `${k} 금융 투자 피해 사례가 접수되어 사건 대응이 준비되고 있습니다.`,
  (k: string) => `${k} 금융 투자 사기 의혹 사건에 대한 법률 대응이 검토되고 있습니다.`,
  (k: string) => `${k} 금융 투자 피해와 관련된 공동 대응 절차가 준비되고 있습니다.`,
  (k: string) => `${k} 금융 투자 피해 사건에 대한 법률 검토가 진행 중입니다.`,
  (k: string) => `${k} 금융 투자 손실 피해와 관련된 사건 대응이 준비되고 있습니다.`,
];

function getContentFromTemplate(keyword: string): string {
  const template = CASE_TEMPLATES[Math.floor(Math.random() * CASE_TEMPLATES.length)];
  return template(keyword);
}

export function generateCaseFromKeyword(keyword: string): Omit<Case, "id" | "createdAt"> {
  const k = keyword.trim();
  const slug = slugify(k);
  const content = getContentFromTemplate(k);
  return {
    slug,
    title: `${k} 투자 피해 사건`,
    description: content,
    content,
    keywords: k,
    victimType: `${k} 투자 피해자`,
    lawsuitType: `형사 고소 및 민사 손해배상 청구`,
    documents: `거래 내역, 입출금 내역, 투자 관련 자료`,
    process: `1) 상담 접수 → 2) 자료 검토 → 3) 소송 진행`,
    phone: "1588-0000",
    status: "접수진행중",
  };
}

export function addCaseFromKeyword(keyword: string): Case {
  const generated = generateCaseFromKeyword(keyword);
  const id = `runtime-${Date.now()}`;
  const createdAt = new Date().toISOString().slice(0, 10);
  const newCase: Case = {
    ...generated,
    id,
    createdAt,
  };
  const runtime = loadRuntimeCases();
  runtime.push(newCase);
  saveRuntimeCases(runtime);
  return newCase;
}

export function getCases(): Case[] {
  const initial = (initialCasesData as Case[]).map((c) => ({
    ...c,
    id: c.id || `initial-${c.slug}`,
  }));
  const runtime = loadRuntimeCases();
  return [...initial, ...runtime];
}

export function getCaseBySlug(slug: string): Case | null {
  const all = getCases();
  return all.find((c) => c.slug === slug) ?? null;
}

export function addCase(data: Omit<Case, "id" | "slug" | "createdAt">): Case {
  const slug = slugify(data.title);
  const id = `runtime-${Date.now()}`;
  const createdAt = new Date().toISOString().slice(0, 10);
  const newCase: Case = {
    ...data,
    slug,
    id,
    createdAt,
  };
  const runtime = loadRuntimeCases();
  runtime.push(newCase);
  saveRuntimeCases(runtime);
  return newCase;
}
