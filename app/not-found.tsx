import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Mail, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import Layout from "@/components/component-layout";

export default function NotFound() {
  return (
    <Layout title="Page Not Found">
      <div className="flex flex-col h-full w-full items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
        <Card className="w-full max-w-2xl p-8 space-y-6 text-center">
          <div className="flex items-center justify-center gap-2 text-destructive">
            <AlertCircle className="h-8 w-8" />
            <h1 className="text-4xl font-bold">404</h1>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
            <p className="text-muted-foreground">
              Oops! The page you're looking for seems to have vanished into the
              digital void.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-muted-foreground">
                Here are some things you can try:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 text-left">
                <li className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Go back to the previous page</span>
                </li>
                <li className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span>Return to the homepage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Contact support if you believe this is an error</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild variant="default">
                <Link href="/dashboard">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Homepage
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="mailto:support@cinefy.in" target="_blank">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              If you continue to experience issues, please contact our support
              team at{" "}
              <a
                href="mailto:support@cinefy.in"
                className="text-primary hover:underline"
                target="_blank"
              >
                support@cinefy.in
              </a>
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
