"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const supabase = createClient();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) throw error;
      router.push("/auth/signup-success");
    } catch (error) {
      setError(error instanceof Error ? error.message : "signup failed");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <Card className={"w-full max-w-md p-8 bg-zinc-900 border-zinc-800"}>
        <h1 className=" text-3xl font-bold text-emerald-400"> Sign Up </h1>
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div>
            <Label className="block text-sm font-medium text-zinc-300 mask-b-to-red-200">
              Email
            </Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-0 mt-2 h-10 text-white"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-zinc-300 mask-b-to-red-200">
              Password
            </Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-0 mt-2 h-10 text-white "
              placeholder="Enter Password"
              required
            />
          </div>
          {error && (
            <div className="p-3 bg-red-900/20 rounded-xl text-red-300 border border-red-800">
              {error}
            </div>
          )}
          <Button
            className={"bg-emerald-400 hover:bg-emerald-500 w-full h-10 mt-2"}
            type="submit"
          >
            Sign Up
          </Button>

          <p className="text-center text-zinc-400">
            Already have an account |
            <Link className="text-emerald-400" href={"/auth/login"}>
              {" "}
              Login
            </Link>
          </p>
        </form>
      </Card>
    </main>
  );
};

export default SignUpPage;
