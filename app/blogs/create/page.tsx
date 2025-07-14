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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/components/component-layout";

export default function AddBlogPage() {
  return (
    <Layout
      title="Create Blog"
      action={
        <div className="flex gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button>Publish</Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Blog Content</CardTitle>
              <CardDescription>Create a new blog post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="blog-title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input id="blog-title" placeholder="Enter blog title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="blog-slug">
                  Slug <span className="text-red-500">*</span>
                </Label>
                <Input id="blog-slug" placeholder="blog-post-slug" />
                <p className="text-xs text-muted-foreground">
                  The URL-friendly version of the title
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="blog-excerpt">Excerpt</Label>
                <Textarea
                  id="blog-excerpt"
                  placeholder="Enter a short excerpt"
                  className="min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground">
                  A short summary of the blog post
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="blog-content">
                  Content <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="blog-content"
                  placeholder="Enter blog content"
                  className="min-h-[300px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input id="meta-title" placeholder="Enter meta title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  placeholder="Enter meta description"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Meta Keywords</Label>
                <Input
                  id="meta-keywords"
                  placeholder="Enter keywords separated by commas"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
              <CardDescription>Upload blog featured image</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop or click to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  Recommended size: 1200 x 630 pixels
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Select File
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Publishing Options</CardTitle>
              <CardDescription>
                Configure blog publishing settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="blog-status">Status</Label>
                <Select>
                  <SelectTrigger id="blog-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="blog-category">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger id="blog-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guides">Guides</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="architecture">Architecture</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="blog-author">
                  Author <span className="text-red-500">*</span>
                </Label>
                <Select>
                  <SelectTrigger id="blog-author">
                    <SelectValue placeholder="Select author" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Doe</SelectItem>
                    <SelectItem value="sarah">Sarah Miller</SelectItem>
                    <SelectItem value="robert">Robert Johnson</SelectItem>
                    <SelectItem value="emma">Emma Wilson</SelectItem>
                    <SelectItem value="michael">Michael Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="blog-publish-date">Publish Date</Label>
                <Input id="blog-publish-date" type="datetime-local" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="blog-featured" />
                  <Label htmlFor="blog-featured">Featured Post</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="blog-comments" defaultChecked />
                  <Label htmlFor="blog-comments">Allow Comments</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>
                Add tags to categorize your blog
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="blog-tags">Tags</Label>
                <Input
                  id="blog-tags"
                  placeholder="Enter tags separated by commas"
                />
                <p className="text-xs text-muted-foreground">
                  e.g., property, investment, tips
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
