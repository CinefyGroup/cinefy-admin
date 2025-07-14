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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Upload } from "lucide-react";
import Layout from "@/components/component-layout";

export default function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  // In a real app, you would fetch the project data based on the ID
  const projectId = params.id;

  return (
    <Layout title="Edit Project" action={<Button>Save Changes</Button>}>
      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="details">Project Details</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Units</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Edit the basic details of the project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="project-name">
                    Project Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="project-name" defaultValue="Sunset Residences" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-slug">
                    Slug <span className="text-red-500">*</span>
                  </Label>
                  <Input id="project-slug" defaultValue="sunset-residences" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="builder">
                    Builder <span className="text-red-500">*</span>
                  </Label>
                  <Select defaultValue="horizon">
                    <SelectTrigger id="builder">
                      <SelectValue placeholder="Select builder" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="horizon">Horizon Builders</SelectItem>
                      <SelectItem value="urban">Urban Developers</SelectItem>
                      <SelectItem value="premium">Premium Homes</SelectItem>
                      <SelectItem value="eco">Eco Builders</SelectItem>
                      <SelectItem value="skyline">
                        Skyline Construction
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select defaultValue="residential">
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                      <SelectItem value="affordable">Affordable</SelectItem>
                      <SelectItem value="waterfront">Waterfront</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="short-description">
                  Short Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="short-description"
                  defaultValue="Sunset Residences offers luxury living with breathtaking views of the city skyline."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="active">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="sold-out">Sold Out</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="featured" defaultChecked />
                <Label htmlFor="featured">Featured Project</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Edit detailed information about the project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full-description">Full Description</Label>
                <Textarea
                  id="full-description"
                  defaultValue="Sunset Residences is a premium residential complex offering luxury apartments with modern amenities. Located in the heart of the city, it provides easy access to shopping centers, schools, and parks. The project features spacious 1, 2, and 3 bedroom apartments with high-quality finishes and panoramic views."
                  className="min-h-[200px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="Downtown" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="123 Sunset Boulevard" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="Los Angeles" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" defaultValue="California" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue="United States" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" defaultValue="90001" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    defaultValue="2023-01-15"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="completion-date">Completion Date</Label>
                  <Input
                    id="completion-date"
                    type="date"
                    defaultValue="2025-06-30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="possession-date">Possession Date</Label>
                  <Input
                    id="possession-date"
                    type="date"
                    defaultValue="2025-07-15"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="swimming-pool" defaultChecked />
                    <Label htmlFor="swimming-pool">Swimming Pool</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="gym" defaultChecked />
                    <Label htmlFor="gym">Gym</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="garden" defaultChecked />
                    <Label htmlFor="garden">Garden</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="parking" defaultChecked />
                    <Label htmlFor="parking">Parking</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="security" defaultChecked />
                    <Label htmlFor="security">24/7 Security</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="clubhouse" defaultChecked />
                    <Label htmlFor="clubhouse">Clubhouse</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
              <CardDescription>
                Update images and videos for the project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Featured Image</Label>
                <div className="border rounded-lg p-4">
                  <div className="aspect-video w-full bg-muted rounded-md overflow-hidden mb-4">
                    <img
                      src="/placeholder.svg?height=400&width=600"
                      alt="Featured image preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    Change Image
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Gallery Images</Label>
                <div className="border rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="aspect-square bg-muted rounded-md overflow-hidden relative group"
                      >
                        <img
                          src={`/placeholder.svg?height=200&width=200&text=Image ${i}`}
                          alt={`Gallery image ${i}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white"
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm">
                    Add More Images
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="video-url">Video URL</Label>
                <Input
                  id="video-url"
                  defaultValue="https://www.youtube.com/watch?v=example"
                />
                <p className="text-xs text-muted-foreground">
                  Supports YouTube, Vimeo, or other video embedding services
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="virtual-tour">Virtual Tour URL</Label>
                <Input
                  id="virtual-tour"
                  defaultValue="https://example.com/virtual-tour"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Units</CardTitle>
              <CardDescription>
                Update pricing and unit information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price-from">Price From</Label>
                  <Input id="price-from" defaultValue="500000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price-to">Price To</Label>
                  <Input id="price-to" defaultValue="1200000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price-per-sqft">Price Per Sq.Ft.</Label>
                  <Input id="price-per-sqft" defaultValue="350" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="inr">INR (₹)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Unit Types</Label>
                <div className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 pb-4 border-b">
                    <div className="space-y-2">
                      <Label htmlFor="unit-type-1">Type</Label>
                      <Input id="unit-type-1" defaultValue="1BHK" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit-area-1">Area (sq.ft.)</Label>
                      <Input id="unit-area-1" defaultValue="750" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit-price-1">Price</Label>
                      <Input id="unit-price-1" defaultValue="500000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit-count-1">Total Units</Label>
                      <Input id="unit-count-1" defaultValue="40" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 pb-4 border-b">
                    <div className="space-y-2">
                      <Label htmlFor="unit-type-2">Type</Label>
                      <Input id="unit-type-2" defaultValue="2BHK" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit-area-2">Area (sq.ft.)</Label>
                      <Input id="unit-area-2" defaultValue="1100" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit-price-2">Price</Label>
                      <Input id="unit-price-2" defaultValue="750000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit-count-2">Total Units</Label>
                      <Input id="unit-count-2" defaultValue="60" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 pb-4 border-b">
                    <div className="space-y-2">
                      <Label htmlFor="unit-type-3">Type</Label>
                      <Input id="unit-type-3" defaultValue="3BHK" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit-area-3">Area (sq.ft.)</Label>
                      <Input id="unit-area-3" defaultValue="1500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit-price-3">Price</Label>
                      <Input id="unit-price-3" defaultValue="1200000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit-count-3">Total Units</Label>
                      <Input id="unit-count-3" defaultValue="20" />
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    + Add Unit Type
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="total-units">Total Units</Label>
                  <Input id="total-units" defaultValue="120" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="available-units">Available Units</Label>
                  <Input id="available-units" defaultValue="85" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-plan">Payment Plan</Label>
                <Textarea
                  id="payment-plan"
                  defaultValue="20% booking amount, 30% on foundation completion, 30% on structure completion, 20% on possession."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Information</CardTitle>
              <CardDescription>Optimize for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input
                  id="meta-title"
                  defaultValue="Sunset Residences | Luxury Apartments in Los Angeles"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  defaultValue="Sunset Residences offers luxury living with breathtaking views of the city skyline. Explore our premium 1, 2, and 3 bedroom apartments in downtown Los Angeles."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Meta Keywords</Label>
                <Input
                  id="meta-keywords"
                  defaultValue="luxury apartments, los angeles, sunset residences, downtown living, premium homes"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="indexable" defaultChecked />
                <Label htmlFor="indexable">
                  Allow search engines to index this project
                </Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
