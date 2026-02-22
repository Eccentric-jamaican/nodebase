"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginValues) => {
    setIsLoading(true);
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: "/",
    });
    setIsLoading(false);

    if (error) {
      toast.error(error.message ?? "Sign in failed. Please check your credentials.");
      return;
    }

    router.push("/");
    router.refresh();
  };

  const handleSocialLogin = async (provider: "github" | "google") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  return (
    <div>
      {/* Heading */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-foreground mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground font-mono">
          Sign in to your workspace
        </p>
      </div>

      {/* Social buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button
          type="button"
          variant="outline"
          className="h-10"
          onClick={() => handleSocialLogin("github")}
          disabled={isLoading}
        >
          <Image src="/logos/github.svg" alt="GitHub" width={18} height={18} />
          GitHub
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-10"
          onClick={() => handleSocialLogin("google")}
          disabled={isLoading}
        >
          <Image src="/logos/google.svg" alt="Google" width={18} height={18} />
          Google
        </Button>
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-xs text-muted-foreground uppercase tracking-wider font-mono">
            or
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono"
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
            className="h-10"
          />
          {errors.email && (
            <p className="text-[11px] text-destructive font-mono">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="block text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            disabled={isLoading}
            aria-invalid={!!errors.password}
            {...register("password")}
            className="h-10"
          />
          {errors.password && (
            <p className="text-[11px] text-destructive font-mono">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 mt-2 font-semibold text-sm"
        >
          {isLoading ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      {/* Footer link */}
      <p className="mt-4 text-center text-xs text-muted-foreground font-mono">
        No account?{" "}
        <Link
          href="/sign-up"
          className="text-primary hover:text-primary/80 transition-colors"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
