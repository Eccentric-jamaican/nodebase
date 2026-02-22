"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterValues) => {
    setIsLoading(true);
    const { error } = await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: values.email,
      callbackURL: "/",
    });
    setIsLoading(false);

    if (error) {
      toast.error(error.message ?? "Registration failed. Please try again.");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div>
      {/* Heading */}
      <div className="mb-7">
        <h1
          className="text-xl font-semibold text-zinc-100 mb-1"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Create account
        </h1>
        <p
          className="text-[13px] text-zinc-500"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          Start building your workflows
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-[10px] font-medium tracking-[0.15em] uppercase text-zinc-500"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            disabled={isLoading}
            aria-invalid={!!errors.email}
            {...register("email")}
            className="bg-zinc-900/60 border-zinc-800 text-zinc-100 placeholder:text-zinc-700 focus-visible:border-amber-500/50 focus-visible:ring-amber-500/15 h-10"
          />
          {errors.email && (
            <p
              className="text-[11px] text-red-400"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="block text-[10px] font-medium tracking-[0.15em] uppercase text-zinc-500"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="Min. 8 characters"
            disabled={isLoading}
            aria-invalid={!!errors.password}
            {...register("password")}
            className="bg-zinc-900/60 border-zinc-800 text-zinc-100 placeholder:text-zinc-700 focus-visible:border-amber-500/50 focus-visible:ring-amber-500/15 h-10"
          />
          {errors.password && (
            <p
              className="text-[11px] text-red-400"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="confirmPassword"
            className="block text-[10px] font-medium tracking-[0.15em] uppercase text-zinc-500"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Confirm password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Repeat your password"
            disabled={isLoading}
            aria-invalid={!!errors.confirmPassword}
            {...register("confirmPassword")}
            className="bg-zinc-900/60 border-zinc-800 text-zinc-100 placeholder:text-zinc-700 focus-visible:border-amber-500/50 focus-visible:ring-amber-500/15 h-10"
          />
          {errors.confirmPassword && (
            <p
              className="text-[11px] text-red-400"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 mt-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm tracking-wide transition-colors duration-150 rounded-none"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          {isLoading ? "Creating account…" : "Create account →"}
        </Button>
      </form>

      {/* Footer link */}
      <p
        className="mt-6 text-center text-[12px] text-zinc-600"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-amber-500/80 hover:text-amber-400 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
