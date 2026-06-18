import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server-client";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    // `next` is the URL to redirect to after sign-in (defaults to /dashboard)
    const next = searchParams.get("next") ?? "/dashboard";

    if (code) {
        const supabase = await getSupabaseServerClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    // Something went wrong — redirect to sign-in with an error flag
    return NextResponse.redirect(`${origin}/sign-in?error=auth_callback_error`);
}
