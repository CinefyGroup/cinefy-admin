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
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/component-layout";

export default function EditTagPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the tag data based on the ID
  const tagId = params.id;

  return (
    <Layout
      title="Edit Tag"
      action={
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Update</Button>
        </div>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Tag Information</CardTitle>
          <CardDescription>Edit property tag details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="text-base py-1 px-3">
              Swimming Pool
            </Badge>
            <p className="text-sm text-muted-foreground">Current appearance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tag-name">
                Tag Name <span className="text-red-500">*</span>
              </Label>
              <Input id="tag-name" defaultValue="Swimming Pool" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tag-slug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input id="tag-slug" defaultValue="swimming-pool" />
              <p className="text-xs text-muted-foreground">
                The "slug" is the URL-friendly version of the name.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tag-description">Description</Label>
            <Textarea
              id="tag-description"
              defaultValue="Properties that include a swimming pool as an amenity."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tag-color">Color</Label>
            <div className="flex gap-2">
              <Input
                id="tag-color"
                type="color"
                className="w-12 h-10 p-1"
                defaultValue="#3b82f6"
              />
              <Input
                id="tag-color-hex"
                defaultValue="#3b82f6"
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
              <Switch id="tag-featured" defaultChecked />
              <Label htmlFor="tag-featured">Featured Tag</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tag-icon">Icon</Label>
            <Input id="tag-icon" defaultValue="droplet" />
            <p className="text-xs text-muted-foreground">
              Enter an icon name from the icon library
            </p>
          </div>

          <div className="space-y-2">
            <Label>Statistics</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-md p-4">
                <p className="text-sm text-muted-foreground">
                  Projects Using This Tag
                </p>
                <p className="text-2xl font-bold">28</p>
              </div>
              <div className="border rounded-md p-4">
                <p className="text-sm text-muted-foreground">Search Count</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <div className="border rounded-md p-4">
                <p className="text-sm text-muted-foreground">Click Rate</p>
                <p className="text-2xl font-bold">12.4%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
