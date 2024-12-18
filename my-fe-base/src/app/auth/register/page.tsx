"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Button, Label, Input } from "@/components";
import { EyeClosed as EyeClosedIcon, Eye as EyeOpenIcon } from "lucide-react";

export default function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">Create your account by filling in the details below</p>
          </div>
          <div className="grid gap-4">
            {/* Full Name Field */}
            <div className="grid gap-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input id="fullname" type="text" placeholder="John Doe" required />
            </div>
            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="johndoe@example.com" required />
            </div>
            {/* Password Field */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Input id="password" type={passwordVisible ? "text" : "password"} placeholder="Enter your password" required />
                <button type="button" className="absolute inset-y-0 right-2 flex items-center" onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <EyeOpenIcon strokeWidth={1.5} size={18} /> : <EyeClosedIcon strokeWidth={1.5} size={18} />}
                </button>
              </div>
            </div>
            {/* Confirm Password Field */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirm-password">Confirm Password</Label>
              </div>
              <div className="relative">
                <Input id="confirm-password" type={confirmPasswordVisible ? "text" : "password"} placeholder="Confirm your password" required />
                <button type="button" className="absolute inset-y-0 right-2 flex items-center" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                  {confirmPasswordVisible ? <EyeOpenIcon strokeWidth={1.5} size={18} /> : <EyeClosedIcon strokeWidth={1.5} size={18} />}
                </button>
              </div>
            </div>
            {/* Register Button */}
            <Button type="submit" className="w-full">
              Register
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">{/* You can add a cover image here */}</div>
    </div>
  );
}
