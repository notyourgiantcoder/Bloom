"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server-client";

export async function createRenderJob(pdfUrl: string) {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from("render_jobs")
    .insert({ pdf_url: pdfUrl, status: "queued" })
    .select()
    .single();

  if (error) throw new Error(error.message);

  fetch(process.env.PIPELINE_CLOUD_RUN_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ job_id: data.id, pdf_url: data.pdf_url }),
  }).catch((err) => console.error("Pipeline fetch error:", err));

  return data.id;
}
