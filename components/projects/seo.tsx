"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useFormContext } from "react-hook-form";

export function SEO() {
  const form = useFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Information</CardTitle>
        <CardDescription>Optimize for search engines</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="metaTitle">Meta Title</Label>
          <Input 
            id="metaTitle" 
            placeholder="Enter meta title" 
            {...form.register("metaTitle")}
          />
          {form.formState.errors.metaTitle && (
            <p className="text-sm text-red-500">
              {form.formState.errors.metaTitle.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="metaDescription">Meta Description</Label>
          <Textarea
            id="metaDescription"
            placeholder="Enter meta description"
            className="min-h-[100px]"
            {...form.register("metaDescription")}
          />
          {form.formState.errors.metaDescription && (
            <p className="text-sm text-red-500">
              {form.formState.errors.metaDescription.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="metaKeywords">Meta Keywords</Label>
          <Input
            id="metaKeywords"
            placeholder="Enter keywords separated by commas"
            {...form.register("metaKeywords")}
          />
          {form.formState.errors.metaKeywords && (
            <p className="text-sm text-red-500">
              {form.formState.errors.metaKeywords.message}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Switch 
            id="indexable" 
            checked={form.watch("indexable")}
            onCheckedChange={(checked) => form.setValue("indexable", checked)}
          />
          <Label htmlFor="indexable">
            Allow search engines to index this project
          </Label>
        </div>
      </CardContent>
    </Card>
  );
} 