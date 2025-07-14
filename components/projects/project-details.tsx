"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useFormContext } from "react-hook-form";
import TextEditor from "@/components/ui/editor";

export function ProjectDetails() {
  const form = useFormContext();

  return (
        <div className="space-y-2 py-4">
          <Label htmlFor="description" className="text-sm text-muted-foreground px-1">Enter detailed information about the project</Label>
          <TextEditor
            data={form.watch("description")}
            dispatch={form.setValue}
            field="description"
          />
        </div>
  );
} 