import type { Case } from "./types";
import { getSupabase } from "./supabase";

/**
 * Slugify for legacy/numeric fallback (strips non-ASCII).
 * Use slugifyForSeo for new SEO-friendly slugs.
 */
export function slugify(text: string): string {
  const raw = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!raw || /^-*$/.test(raw)) {
    return `case-${Date.now()}`;
  }
  return raw;
}

/**
 * SEO-friendly slug from title. Preserves Korean (Hangul) and ASCII.
 * - Keeps letters (incl. Hangul), numbers, spaces, hyphens
 * - Spaces → hyphens, collapse repeated, trim
 * - Removes unsafe URL chars
 * - Fallback to case-{timestamp} if empty
 */
export function slugifyForSeo(title: string): string {
  if (!title || typeof title !== "string") return `case-${Date.now()}`;
  // Keep: Hangul syllables (AC00-D7A3), Hangul Jamo (3130-318F), Latin, digits, space, hyphen
  const keepRegex = /[\u3130-\u318F\uAC00-\uD7A3A-Za-z0-9\s-]/g;
  const kept = title.match(keepRegex);
  const s = (kept || []).join("")
    .trim()
    .replace(/[\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!s) return `case-${Date.now()}`;
  return s.normalize("NFC");
}

/**
 * Normalize slug for DB lookup: decode URL encoding and use canonical Unicode (NFC).
 * Use this when reading slug from URL params so it matches stored slugs.
 */
export function normalizeSlugForLookup(slug: string): string {
  if (!slug || typeof slug !== "string") return "";
  try {
    const decoded = decodeURIComponent(slug);
    return decoded.trim().normalize("NFC");
  } catch {
    return slug.trim().normalize("NFC");
  }
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

function rowToCase(row: Record<string, unknown>): Case {
  const kw = row.keywords;
  const keywordsStr = Array.isArray(kw) ? (kw as string[]).join(",") : String(kw ?? "");
  return {
    id: String(row.id ?? ""),
    slug: String(row.slug ?? ""),
    title: String(row.title ?? ""),
    description: String(row.description ?? ""),
    content: row.content != null ? String(row.content) : undefined,
    keywords: keywordsStr,
    damageType: row.damage_type != null ? String(row.damage_type) : undefined,
    litigationMethod: row.litigation_method != null ? String(row.litigation_method) : undefined,
    requiredDocs: row.required_documents != null ? String(row.required_documents) : undefined,
    victimType: row.victim_type != null ? String(row.victim_type) : undefined,
    lawsuitType: row.lawsuit_type != null ? String(row.lawsuit_type) : undefined,
    documents: row.required_documents != null ? String(row.required_documents) : undefined,
    process: String(row.process ?? ""),
    phone: String(row.phone ?? ""),
    status: String(row.status ?? ""),
    tagline: row.tagline != null ? String(row.tagline) : undefined,
    createdAt: row.created_at != null ? String(row.created_at) : "",
    updatedAt: row.updated_at != null ? String(row.updated_at) : undefined,
  };
}

export function generateCaseFromKeyword(keyword: string): Omit<Case, "id" | "createdAt"> {
  const k = keyword.trim() || "case";
  const title = `${k} 투자 피해 사건`;
  const baseSlug = slugifyForSeo(title);
  const content = getContentFromTemplate(k);
  return {
    slug: baseSlug,
    title,
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

async function ensureUniqueSlug(baseSlug: string): Promise<string> {
  let slug = baseSlug;
  let suffix = 1;
  while (true) {
    const existing = await getCaseBySlug(slug);
    if (!existing) return slug;
    slug = `${baseSlug}-${++suffix}`;
  }
}

export async function addCaseFromKeyword(keyword: string): Promise<Case> {
  const generated = generateCaseFromKeyword(keyword);
  const now = new Date().toISOString();
  const slug = await ensureUniqueSlug(generated.slug);

  const row: Record<string, unknown> = {
    slug,
    title: generated.title,
    description: generated.description,
    keywords: [generated.keywords],
    victim_type: generated.victimType ?? null,
    damage_type: null,
    lawsuit_type: generated.lawsuitType ?? null,
    required_documents: generated.documents ?? null,
    process: generated.process,
    phone: generated.phone,
    status: generated.status,
    tagline: null,
    created_at: now,
    updated_at: now,
  };

  const { data, error } = await getSupabase()
    .from("cases")
    .insert(row)
    .select()
    .single();

  if (error) throw error;
  return rowToCase(data as Record<string, unknown>);
}

export async function getCases(): Promise<Case[]> {
  const { data, error } = await getSupabase()
    .from("cases")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => rowToCase(row as Record<string, unknown>));
}

export async function getCaseBySlug(slug: string): Promise<Case | null> {
  const normalized = normalizeSlugForLookup(slug);
  if (!normalized) return null;
  const { data, error } = await getSupabase()
    .from("cases")
    .select("*")
    .eq("slug", normalized)
    .maybeSingle();

  if (error) throw error;
  return data ? rowToCase(data as Record<string, unknown>) : null;
}

export async function deleteCaseById(id: string): Promise<void> {
  const { error } = await getSupabase()
    .from("cases")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function addCase(data: Omit<Case, "id" | "slug" | "createdAt">): Promise<Case> {
  const baseSlug = slugifyForSeo(data.title);
  const slug = await ensureUniqueSlug(baseSlug);
  const now = new Date().toISOString();
  const keywordsArr = typeof data.keywords === "string"
    ? data.keywords.split(",").map((s) => s.trim()).filter(Boolean)
    : [data.keywords];

  const row: Record<string, unknown> = {
    slug,
    title: data.title,
    description: data.description ?? "",
    keywords: keywordsArr.length ? keywordsArr : [data.keywords],
    victim_type: data.victimType ?? null,
    damage_type: data.damageType ?? null,
    lawsuit_type: data.lawsuitType ?? null,
    required_documents: data.requiredDocs ?? data.documents ?? null,
    process: data.process ?? "",
    phone: data.phone ?? "1588-0000",
    status: data.status ?? "접수진행중",
    tagline: data.tagline ?? null,
    created_at: now,
    updated_at: now,
  };

  const { data: inserted, error } = await getSupabase()
    .from("cases")
    .insert(row)
    .select()
    .single();

  if (error) throw error;
  return rowToCase(inserted as Record<string, unknown>);
}
