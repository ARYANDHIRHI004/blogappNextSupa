'use server'

import { redirect } from "next/navigation";
import { createClient } from "../../../lib/supabase/server";

export async function POST(){
    const supabase = await createClient();
    await supabase.auth.signOut();
    console.log("aryan")
    redirect("/auth/login")
}