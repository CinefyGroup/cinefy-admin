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
import Layout from "@/components/component-layout";

export default function AddTagPage() {
  return (
    <Layout
      title="Add Tag"
      action={
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Tag</Button>
        </div>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Tag Information</CardTitle>
          <CardDescription>
            Add a new property tag for filtering
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tag-name">
                Tag Name <span className="text-red-500">*</span>
              </Label>
              <Input id="tag-name" placeholder="Enter tag name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tag-slug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input id="tag-slug" placeholder="tag-slug" />
              <p className="text-xs text-muted-foreground">
                The "slug" is the URL-friendly version of the name.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tag-description">Description</Label>
            <Textarea
              id="tag-description"
              placeholder="Enter tag description"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tag-color">Color (Optional)</Label>
            <div className="flex gap-2">
              <Input
                id="tag-color"
                type="color"
                className="w-12 h-10 p-1"
                defaultValue="#6366f1"
              />
              <Input
                id="tag-color-hex"
                placeholder="HEX color code"
                defaultValue="#6366f1"
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Choose a color for the tag badge
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="tag-active" defaultChecked />
              <Label htmlFor="tag-active">Active</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="tag-featured" />
              <Label htmlFor="tag-featured">Featured Tag</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tag-icon">Icon (Optional)</Label>
            <Input id="tag-icon" placeholder="Enter icon name" />
            <p className="text-xs text-muted-foreground">
              Enter an icon name from the icon library
            </p>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
