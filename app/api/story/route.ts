import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const apiKey = process.env.NOVELAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "NOVELAI_API_KEY fehlt" }, { status: 500 })
    }

    const body = await req.json()
    const { input, model = "kayra-v1", parameters } = body || {}

    if (!input || typeof input !== "string") {
      return NextResponse.json({ error: "Feld 'input' ist erforderlich" }, { status: 400 })
    }

    const payload = {
      input,
      model,
      parameters: {
        max_length: 1000,
        temperature: 0.85,
        top_p: 0.9,
        min_length: 200,
        ...(parameters || {}),
      },
    }

    const response = await fetch("https://api.novelai.net/ai/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unbekannter Fehler")
      return NextResponse.json(
        { error: "NovelAI-Fehler", details: errorText },
        { status: response.status || 500 }
      )
    }

    // NovelAI kann je nach Plan/Endpoint JSON oder reinen Text liefern
    let storyText = ""
    try {
      const data = await response.json()
      storyText = data.output || data.story || data.text || ""
      if (!storyText && Array.isArray(data)) {
        storyText = data.join("\n\n")
      }
    } catch {
      storyText = await response.text()
    }

    return NextResponse.json({ story: storyText })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Interner Fehler" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const apiKey = process.env.NOVELAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "NOVELAI_API_KEY fehlt" }, { status: 500 })
    }

    const payload = {
      input: body.input,
      model: body.model || "kayra-v1",
      parameters: body.parameters || { max_length: 1000, temperature: 0.85, top_p: 0.9, min_length: 200 },
    }

    const res = await fetch("https://api.novelai.net/ai/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const errText = await res.text()
      return NextResponse.json({ error: "NovelAI Fehler", details: errText }, { status: res.status })
    }

    const data = await res.json().catch(async () => ({ raw: await res.text() }))
    const story = data.story || data.output || data.text || data.result || data?.choices?.[0]?.text || ""
    return NextResponse.json({ story, raw: data })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unbekannter Fehler" }, { status: 500 })
  }
}


