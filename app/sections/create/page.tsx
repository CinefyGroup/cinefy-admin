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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/components/component-layout";

export default function AddSectionPage() {
  return (
    <Layout
      title="Add Section"
      action={
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Section</Button>
        </div>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Section Information</CardTitle>
          <CardDescription>Add a new content section</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="section-name">
                Section Name <span className="text-red-500">*</span>
              </Label>
              <Input id="section-name" placeholder="Enter section name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section-slug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input id="section-slug" placeholder="section-slug" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="section-description">Description</Label>
            <Textarea
              id="section-description"
              placeholder="Enter section description"
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="section-type">
                Section Type <span className="text-red-500">*</span>
              </Label>
              <Select>
                <SelectTrigger id="section-type">
                  <SelectValue placeholder="Select section type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="carousel">Carousel</SelectItem>
                  <SelectItem value="grid">Grid</SelectItem>
                  <SelectItem value="list">List</SelectItem>
                  <SelectItem value="showcase">Showcase</SelectItem>
                  <SelectItem value="banner">Banner</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="section-display-order">Display Order</Label>
              <Input
                id="section-display-order"
                type="number"
                placeholder="Enter display order"
                defaultValue="1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="section-title">Display Title (Optional)</Label>
            <Input id="section-title" placeholder="Enter display title" />
            <p className="text-xs text-muted-foreground">
              This title will be displayed on the frontend
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="section-subtitle">Subtitle (Optional)</Label>
            <Input id="section-subtitle" placeholder="Enter subtitle" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="section-content-type">
              Content Type <span className="text-red-500">*</span>
            </Label>
            <Select>
              <SelectTrigger id="section-content-type">
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="projects">Projects</SelectItem>
                <SelectItem value="builders">Builders</SelectItem>
                <SelectItem value="categories">Categories</SelectItem>
                <SelectItem value="blogs">Blog Posts</SelectItem>
                <SelectItem value="custom">Custom Content</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="section-filter">Filter Criteria (Optional)</Label>
            <Select>
              <SelectTrigger id="section-filter">
                <SelectValue placeholder="Select filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured Items</SelectItem>
                <SelectItem value="recent">Recently Added</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="custom">Custom Selection</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="section-limit">Item Limit</Label>
            <Input
              id="section-limit"
              type="number"
              placeholder="Enter item limit"
              defaultValue="8"
            />
            <p className="text-xs text-muted-foreground">
              Maximum number of items to display
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="section-view-all-link">
              View All Link (Optional)
            </Label>
            <Input
              id="section-view-all-link"
              placeholder="Enter URL for View All link"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="section-view-all-text">
              View All Text (Optional)
            </Label>
            <Input
              id="section-view-all-text"
              placeholder="e.g., View All Projects"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="section-active" defaultChecked />
              <Label htmlFor="section-active">Active</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="section-show-title" defaultChecked />
              <Label htmlFor="section-show-title">Show Section Title</Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
