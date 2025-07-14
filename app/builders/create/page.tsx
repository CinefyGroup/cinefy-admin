import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Upload } from "lucide-react";
import Layout from "@/components/component-layout";

export default function AddBuilderPage() {
  return (
    <Layout
      title="Add Builder"
      action={
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Builder</Button>
        </div>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Builder Information</CardTitle>
          <CardDescription>
            Add a new property builder/developer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="builder-name">
                Builder Name <span className="text-red-500">*</span>
              </Label>
              <Input id="builder-name" placeholder="Enter builder name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="builder-slug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input id="builder-slug" placeholder="builder-slug" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Logo</Label>
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drag & drop or click to upload
              </p>
              <p className="text-xs text-muted-foreground">
                Recommended size: 200 x 200 pixels
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                Select File
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="builder-email">Email</Label>
              <Input
                id="builder-email"
                type="email"
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="builder-phone">Phone</Label>
              <Input id="builder-phone" placeholder="Enter phone number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="builder-website">Website</Label>
              <Input id="builder-website" placeholder="Enter website URL" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="builder-established">Established Year</Label>
              <Input id="builder-established" placeholder="e.g., 2010" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="builder-description">Description</Label>
            <Textarea
              id="builder-description"
              placeholder="Enter builder description"
              className="min-h-[150px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="builder-address">Address</Label>
            <Textarea
              id="builder-address"
              placeholder="Enter builder address"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-4">
            <Label>Social Media Links</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="builder-facebook">Facebook</Label>
                <Input id="builder-facebook" placeholder="Facebook URL" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="builder-twitter">Twitter</Label>
                <Input id="builder-twitter" placeholder="Twitter URL" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="builder-instagram">Instagram</Label>
                <Input id="builder-instagram" placeholder="Instagram URL" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="builder-linkedin">LinkedIn</Label>
                <Input id="builder-linkedin" placeholder="LinkedIn URL" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="builder-active" defaultChecked />
              <Label htmlFor="builder-active">Active</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="builder-featured" />
              <Label htmlFor="builder-featured">Featured Builder</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="builder-verified" />
              <Label htmlFor="builder-verified">Verified Builder</Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
