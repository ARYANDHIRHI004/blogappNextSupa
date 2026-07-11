import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
export default async function Home() {

  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();



  return (
    <div className="bg-black h-screen flex justify-center items-center">
       <form action="/auth/logout" method="post">
         <Button type="submit" variant={"secondary"}>Logout</Button>
       </form>
       <div className="text-white">{JSON.stringify(data.user?.email)}</div>
    </div>
  );
}
