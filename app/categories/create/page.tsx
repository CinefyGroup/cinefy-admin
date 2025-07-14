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

export default function AddCategoryPage() {
  return (
    <Layout title="Add Category" action={<Button>Save Category</Button>}>
      <Card>
        <CardHeader>
          <CardTitle>Category Information</CardTitle>
          <CardDescription>Add a new property category</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category-name">
                Category Name <span className="text-red-500">*</span>
              </Label>
              <Input id="category-name" placeholder="Enter category name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-slug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input id="category-slug" placeholder="category-slug" />
              <p className="text-xs text-muted-foreground">
                The "slug" is the URL-friendly version of the name. It is
                usually all lowercase and contains only letters, numbers, and
                hyphens.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-description">Description</Label>
            <Textarea
              id="category-description"
              placeholder="Enter category description"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-icon">Icon Class (Optional)</Label>
            <Input
              id="category-icon"
              placeholder="e.g., home, building, apartment"
            />
            <p className="text-xs text-muted-foreground">
              Enter an icon name from the icon library
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="category-active" defaultChecked />
              <Label htmlFor="category-active">Active</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="category-featured" />
              <Label htmlFor="category-featured">Featured Category</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-meta-title">Meta Title (SEO)</Label>
            <Input id="category-meta-title" placeholder="Enter meta title" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-meta-description">
              Meta Description (SEO)
            </Label>
            <Textarea
              id="category-meta-description"
              placeholder="Enter meta description"
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
