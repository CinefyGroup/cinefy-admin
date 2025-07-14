"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { useTheme } from "next-themes";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Building2, MapPin, Users, Shield } from "lucide-react";
import { AxiosError } from "axios";
import Image from "next/image";

interface ErrorResponse {
  message: string;
}

// Define form schema with zod
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast({
        title: "Logged in successfully",
        description: "Welcome back",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast({
        title: "Error Logging In",
        description:
          axiosError.response?.data?.message ||
          axiosError.message ||
          "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Building2,
      title: "Property Management",
      description:
        "Efficiently manage your property portfolio with our comprehensive tools",
    },
    {
      icon: MapPin,
      title: "Location Intelligence",
      description:
        "Get detailed insights about property locations and market trends",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work seamlessly with your team on property projects",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security",
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left side - Features */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 p-12 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="max-w-md mx-auto">
          <Image src="/logo.png" alt="Cinefy Logo" width={500} height={100} />
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-8">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">
              Log in to your account to continue
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-sm border">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className={`w-full ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Forgot your password?{" "}
                  <Link
                    href="mailto:support@cinefy.in"
                    className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
                  >
                    contact administrator
                  </Link>
                </div>
              </form>
            </Form>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Don't have an account? Contact your administrator to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
