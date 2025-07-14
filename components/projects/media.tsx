"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useFormContext } from "react-hook-form";

export function Media() {
  const form = useFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Media</CardTitle>
        <CardDescription>Upload images and videos for the project</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Featured Image</Label>
          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drag & drop or click to upload
            </p>
            <p className="text-xs text-muted-foreground">
              Recommended size: 1200 x 800 pixels
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => {
                // Handle file upload
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    form.setValue("featuredImage", file);
                  }
                };
                input.click();
              }}
            >
              Select File
            </Button>
          </div>
          {form.formState.errors.featuredImage && (
            <p className="text-sm text-red-500">
              {form.formState.errors.featuredImage.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Gallery Images</Label>
          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drag & drop or click to upload multiple images
            </p>
            <p className="text-xs text-muted-foreground">
              Up to 10 images, max 5MB each
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => {
                // Handle multiple file upload
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.multiple = true;
                input.onchange = (e) => {
                  const files = (e.target as HTMLInputElement).files;
                  if (files) {
                    form.setValue("galleryImages", Array.from(files));
                  }
                };
                input.click();
              }}
            >
              Select Files
            </Button>
          </div>
          {form.formState.errors.galleryImages && (
            <p className="text-sm text-red-500">
              {form.formState.errors.galleryImages.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="videoUrl">Video URL</Label>
          <Input
            id="videoUrl"
            placeholder="Enter YouTube or Vimeo URL"
            {...form.register("videoUrl")}
          />
          <p className="text-xs text-muted-foreground">
            Supports YouTube, Vimeo, or other video embedding services
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="virtualTour">Virtual Tour URL</Label>
          <Input 
            id="virtualTour" 
            placeholder="Enter virtual tour URL" 
            {...form.register("virtualTour")}
          />
        </div>
      </CardContent>
    </Card>
  );
} 