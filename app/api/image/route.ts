import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const apiKey = process.env.MAGA_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "MAGA_API_KEY fehlt" }, { status: 500 })
    }

    const body = await req.json()
    const {
      prompt,
      negative_prompt = "unscharf, hässlich, cartoon, verzerrt",
      width = 512,
      height = 768,
      steps = 30,
      inputImages,
    } = body || {}

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Feld 'prompt' ist erforderlich" }, { status: 400 })
    }

    const payload: Record<string, any> = { prompt, negative_prompt, width, height, steps }
    if (Array.isArray(inputImages) && inputImages.length) {
      payload.reference_images = inputImages
      payload.face_swap = true
    }

    const response = await fetch("https://api.maga.ai/v1/generate", {
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
        { error: "Maga AI-Fehler", details: errorText },
        { status: response.status || 500 }
      )
    }

    let images: string[] = []
    try {
      const data = await response.json()
      images = data.images || data.results || []
    } catch {
      images = []
    }

    return NextResponse.json({ images })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Interner Fehler" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const apiKey = process.env.MAGA_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "MAGA_API_KEY fehlt" }, { status: 500 })
    }

    const body = await req.json()
    const {
      prompt,
      negative_prompt = "unscharf, hässlich, cartoon, verzerrt",
      width = 512,
      height = 768,
      steps = 30,
      inputImages,
    } = body || {}

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Feld 'prompt' ist erforderlich" }, { status: 400 })
    }

    // Hinweis: Ein echtes Face-Swap/ControlNet benötigt einen dedizierten Service.
    // Wir leiten optionale Nutzerfotos transparent an die API weiter, falls unterstützt.
    const payload: Record<string, any> = {
      prompt,
      negative_prompt,
      width,
      height,
      steps,
    }

    if (Array.isArray(inputImages) && inputImages.length) {
      payload.reference_images = inputImages // Base64 Data-URIs; abhängig von Anbieter
      payload.face_swap = true
    }

    const response = await fetch("https://api.maga.ai/v1/generate", {
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
        { error: "Maga AI-Fehler", details: errorText },
        { status: response.status || 500 }
      )
    }

    let images: string[] = []
    try {
      const data = await response.json()
      images = data.images || data.results || []
    } catch {
      // Falls ein binärer Stream kommt, hier alternativ umsetzen
      images = []
    }

    return NextResponse.json({ images })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Interner Fehler" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const apiKey = process.env.MAGA_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "MAGA_API_KEY fehlt" }, { status: 500 })
    }

    const payload: any = {
      prompt: body.prompt,
      negative_prompt: body.negative_prompt || "unscharf, hässlich, cartoon, verzerrt",
      width: body.width || 512,
      height: body.height || 768,
      steps: body.steps || 30,
    }

    // Falls Nutzerfotos übergeben wurden, als optionale Inputs mitschicken
    if (Array.isArray(body.inputImages) && body.inputImages.length) {
      payload.inputImages = body.inputImages // Erwartet Base64-DataURLs oder URLs, abhängig vom Anbieter
    }

    const res = await fetch("https://api.maga.ai/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const errText = await res.text()
      return NextResponse.json({ error: "MagaAI Fehler", details: errText }, { status: res.status })
    }

    const data = await res.json().catch(async () => ({ raw: await res.text() }))
    const images: string[] = data.images || data.output || []
    return NextResponse.json({ images, raw: data })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unbekannter Fehler" }, { status: 500 })
  }
}


