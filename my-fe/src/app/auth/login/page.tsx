"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button, Input, Label } from "@/components";
import { EyeClosed as EyeClosedIcon, Eye as EyeOpenIcon } from "lucide-react";

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">Enter your email below to login to your account</p>
            </div>
            <div className="grid gap-4">
              {/* Email Field */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              {/* Password Field */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <div className="relative">
                  <Input id="password" type={passwordVisible ? "text" : "password"} placeholder="Enter your password" required />
                  <button type="button" className="absolute inset-y-0 right-2 flex items-center" onClick={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? <EyeOpenIcon strokeWidth={1.5} size={18} /> : <EyeClosedIcon strokeWidth={1.5} size={18} />}
                  </button>
                </div>
              </div>
              {/* Login Button */}
              <Button type="submit" className="w-full">
                Login
              </Button>
              {/* Login with Google Button */}
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            {/* Sign-Up Link */}
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
        {/* Cover Image Section */}
        <div className="hidden bg-muted lg:block">
          {/* Uncomment and update the Image component if you want to add an image */}
          {/* <Image src="/placeholder.svg" alt="Image" width="1920" height="1080" className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" /> */}
        </div>
      </div>
    </div>
  );
}
