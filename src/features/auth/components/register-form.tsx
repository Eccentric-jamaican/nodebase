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
          Create account
        </h1>
        <p className="text-sm text-muted-foreground font-mono">
          Start building your workflows
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
            autoComplete="new-password"
            placeholder="Min. 8 characters"
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

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="confirmPassword"
            className="block text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono"
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
            className="h-10"
          />
          {errors.confirmPassword && (
            <p className="text-[11px] text-destructive font-mono">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 mt-2 font-semibold text-sm"
        >
          {isLoading ? "Creating account…" : "Create account"}
        </Button>
      </form>

      {/* Footer link */}
      <p className="mt-4 text-center text-xs text-muted-foreground font-mono">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary hover:text-primary/80 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
