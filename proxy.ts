import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "./lib/supabase/server";

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user?.email) {
    return response;
  }
}

export const config = {
    mathcer: ["/"]
}
