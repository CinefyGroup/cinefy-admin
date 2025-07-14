import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Upload } from "lucide-react";
import Layout from "@/components/component-layout";

export default function AddBannerPage() {
  return (
    <Layout
      title="Create Banner"
      action={
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Banner</Button>
        </div>
      }
    >
      <Card>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Add a new promotional banner
          </div>
          <div className="space-y-2">
            <Label>
              Banner Image <span className="text-red-500">*</span>
            </Label>
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drag & drop or click to upload
              </p>
              <p className="text-xs text-muted-foreground">
                Recommended size: 1920 x 600 pixels
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                Select File
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="banner-title">
                Banner Title <span className="text-red-500">*</span>
              </Label>
              <Input id="banner-title" placeholder="Enter banner title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="banner-subtitle">Subtitle (Optional)</Label>
              <Input id="banner-subtitle" placeholder="Enter banner subtitle" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="banner-description">Description (Optional)</Label>
            <Textarea
              id="banner-description"
              placeholder="Enter banner description"
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="banner-link">Link URL</Label>
              <Input id="banner-link" placeholder="Enter link URL" />
            </div>
            <div className="space-y-2 flex flex-col items-center gap-2">
              <p className="text-sm text-muted-foreground">
                Link Text (Optional)
              </p>
              <div>
                <Switch id="banner-active" defaultChecked />
                <Label htmlFor="banner-active">Active</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
