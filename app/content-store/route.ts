import { type NextRequest, NextResponse } from "next/server";
import { getContent, saveContent, type PortfolioContent } from "@/lib/content-store";

// Note: route placée hors du préfixe /api pour rester accessible derrière l'ingress
// de l'environnement de preview (où /api est réservé à un autre service).
export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as PortfolioContent;
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }
    await saveContent(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Content save error:", error);
    return NextResponse.json({ ok: false, error: "Save failed" }, { status: 500 });
  }
}
