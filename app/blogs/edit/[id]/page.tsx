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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/component-layout";
export default function EditBlogPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the blog data based on the ID
  const blogId = params.id;

  return (
    <Layout
      title="Edit Blog Post"
      // description="Edit the blog post"
      action={
        <div className="flex gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button>Update</Button>
        </div>
      }
    >
      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2 space-y-5">
              <Card>
                <CardHeader>
                  <CardTitle>Blog Content</CardTitle>
                  <CardDescription>Edit blog post content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="blog-title">
                      Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="blog-title"
                      defaultValue="Top 10 Luxury Properties in the City"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blog-slug">
                      Slug <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="blog-slug"
                      defaultValue="top-10-luxury-properties-city"
                    />
                    <p className="text-xs text-muted-foreground">
                      The URL-friendly version of the title
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blog-excerpt">Excerpt</Label>
                    <Textarea
                      id="blog-excerpt"
                      defaultValue="Discover the most luxurious properties available in the city right now, featuring stunning architecture, premium amenities, and prime locations."
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
                      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Sunset Residences

Located in the heart of downtown, Sunset Residences offers breathtaking views of the city skyline. With premium finishes and world-class amenities, these luxury apartments redefine urban living.

## Lakeside Villas

Nestled along the pristine shores of Lake Azure, Lakeside Villas combines natural beauty with architectural excellence. Each villa features expansive living spaces, private pools, and direct lake access.

## Metropolitan Towers

Rising 50 stories above the city, Metropolitan Towers stands as a testament to modern luxury. The glass-enclosed penthouses offer 360-degree views and come equipped with smart home technology throughout.

## Conclusion

These properties represent the pinnacle of luxury real estate in our city, each offering unique features and amenities that cater to the most discerning buyers."
                      className="min-h-[300px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-5">
              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                  <CardDescription>Update blog featured image</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="aspect-video w-full bg-muted rounded-md overflow-hidden mb-4">
                      <img
                        src="/placeholder.svg?height=300&width=600"
                        alt="Featured image preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      Change Image
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
                    <Select defaultValue="published">
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
                    <Select defaultValue="luxury">
                      <SelectTrigger id="blog-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="guides">Guides</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="architecture">
                          Architecture
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blog-author">
                      Author <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="emma">
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
                    <Input
                      id="blog-publish-date"
                      type="datetime-local"
                      defaultValue="2023-01-15T10:00"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="blog-featured" defaultChecked />
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
                      defaultValue="luxury, property, premium, real estate, city living"
                    />
                    <p className="text-xs text-muted-foreground">
                      e.g., property, investment, tips
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blog Settings</CardTitle>
              <CardDescription>
                Configure additional blog settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="blog-template">Template</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger id="blog-template">
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="gallery">Gallery</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blog-layout">Layout</Label>
                  <Select defaultValue="right-sidebar">
                    <SelectTrigger id="blog-layout">
                      <SelectValue placeholder="Select layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="right-sidebar">
                        Right Sidebar
                      </SelectItem>
                      <SelectItem value="left-sidebar">Left Sidebar</SelectItem>
                      <SelectItem value="full-width">Full Width</SelectItem>
                      <SelectItem value="narrow">Narrow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="blog-related-posts" defaultChecked />
                  <Label htmlFor="blog-related-posts">Show Related Posts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="blog-author-bio" defaultChecked />
                  <Label htmlFor="blog-author-bio">Show Author Bio</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="blog-social-sharing" defaultChecked />
                  <Label htmlFor="blog-social-sharing">
                    Enable Social Sharing
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="blog-custom-css">Custom CSS (Optional)</Label>
                <Textarea
                  id="blog-custom-css"
                  placeholder="Enter custom CSS"
                  className="min-h-[100px] font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
              <CardDescription>Manage blog comments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Comment Moderation</Label>
                <Select defaultValue="approved">
                  <SelectTrigger>
                    <SelectValue placeholder="Select moderation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">
                      Automatically Approve
                    </SelectItem>
                    <SelectItem value="moderated">
                      Require Moderation
                    </SelectItem>
                    <SelectItem value="disabled">Disable Comments</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Current Comments (5)</Label>
                <div className="border rounded-md p-4 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Manage comments in the Comments section
                  </p>
                  <Button variant="outline" size="sm">
                    View All Comments
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input
                  id="meta-title"
                  defaultValue="Top 10 Luxury Properties in the City | Property Admin"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  defaultValue="Discover the most luxurious properties available in the city right now, featuring stunning architecture, premium amenities, and prime locations. Explore our curated list of the top 10 luxury properties that redefine opulent living."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Meta Keywords</Label>
                <Input
                  id="meta-keywords"
                  defaultValue="luxury properties, premium real estate, luxury homes, high-end properties, city living, penthouses"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="canonical-url">Canonical URL (Optional)</Label>
                <Input
                  id="canonical-url"
                  defaultValue="https://property-admin.com/blogs/top-10-luxury-properties-city"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="indexable" defaultChecked />
                  <Label htmlFor="indexable">
                    Allow search engines to index this post
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="follow-links" defaultChecked />
                  <Label htmlFor="follow-links">
                    Allow search engines to follow links
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Social Media Preview</Label>
                <div className="border rounded-md p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="og-title">Open Graph Title</Label>
                    <Input
                      id="og-title"
                      defaultValue="Top 10 Luxury Properties in the City"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="og-description">
                      Open Graph Description
                    </Label>
                    <Textarea
                      id="og-description"
                      defaultValue="Discover the most luxurious properties available in the city right now."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Open Graph Image</Label>
                    <div className="aspect-[1.91/1] w-full bg-muted rounded-md overflow-hidden mb-4">
                      <img
                        src="/placeholder.svg?height=300&width=600"
                        alt="OG image preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      Change Image
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
