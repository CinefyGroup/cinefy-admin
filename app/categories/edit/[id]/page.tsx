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

export default function EditCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  // In a real app, you would fetch the category data based on the ID
  const categoryId = params.id;

  return (
    <Layout title="Edit Category" action={<Button>Save Changes</Button>}>
      <Card>
        <CardHeader>
          <CardTitle>Category Information</CardTitle>
          <CardDescription>Edit property category details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category-name">
                Category Name <span className="text-red-500">*</span>
              </Label>
              <Input id="category-name" defaultValue="Residential" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-slug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input id="category-slug" defaultValue="residential" />
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
              defaultValue="Properties designed for residential living, including apartments, houses, villas, and condominiums."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-icon">Icon Class (Optional)</Label>
            <Input id="category-icon" defaultValue="home" />
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
              <Switch id="category-featured" defaultChecked />
              <Label htmlFor="category-featured">Featured Category</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-meta-title">Meta Title (SEO)</Label>
            <Input
              id="category-meta-title"
              defaultValue="Residential Properties | Property Admin"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-meta-description">
              Meta Description (SEO)
            </Label>
            <Textarea
              id="category-meta-description"
              defaultValue="Explore our collection of residential properties including apartments, houses, villas, and condominiums for comfortable living."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Statistics</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-md p-4">
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold">48</p>
              </div>
              <div className="border rounded-md p-4">
                <p className="text-sm text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold">42</p>
              </div>
              <div className="border rounded-md p-4">
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">12,458</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
