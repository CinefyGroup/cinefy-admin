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
import { Star, StarHalf } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Layout from "@/components/component-layout";

export default function EditBuilderPage({
  params,
}: {
  params: { id: string };
}) {
  // In a real app, you would fetch the builder data based on the ID
  const builderId = params.id;

  return (
    <Layout
      title="Edit Builder"
      action={
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      }
    >
      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="w-full justify-start sticky -top-4 z-10 border-b">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Builder Information</CardTitle>
              <CardDescription>Edit builder/developer details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src="/placeholder.svg?height=80&width=80"
                    alt="Builder logo"
                  />
                  <AvatarFallback>HB</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Logo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    Recommended size: 200 x 200 pixels
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="builder-name">
                    Builder Name <span className="text-red-500">*</span>
                  </Label>
                  <Input id="builder-name" defaultValue="Horizon Builders" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="builder-slug">
                    Slug <span className="text-red-500">*</span>
                  </Label>
                  <Input id="builder-slug" defaultValue="horizon-builders" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="builder-email">Email</Label>
                  <Input
                    id="builder-email"
                    type="email"
                    defaultValue="contact@horizonbuilders.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="builder-phone">Phone</Label>
                  <Input id="builder-phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="builder-website">Website</Label>
                  <Input
                    id="builder-website"
                    defaultValue="https://www.horizonbuilders.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="builder-established">Established Year</Label>
                  <Input id="builder-established" defaultValue="2010" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="builder-description">Description</Label>
                <Textarea
                  id="builder-description"
                  defaultValue="Horizon Builders is a premier real estate development company with over a decade of experience in creating luxury residential and commercial properties. Known for their attention to detail and quality construction, they have established themselves as a trusted name in the industry."
                  className="min-h-[150px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="builder-address">Address</Label>
                <Textarea
                  id="builder-address"
                  defaultValue="123 Builder Plaza, Suite 500
Los Angeles, CA 90001
United States"
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-4">
                <Label>Social Media Links</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="builder-facebook">Facebook</Label>
                    <Input
                      id="builder-facebook"
                      defaultValue="https://facebook.com/horizonbuilders"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="builder-twitter">Twitter</Label>
                    <Input
                      id="builder-twitter"
                      defaultValue="https://twitter.com/horizonbuilders"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="builder-instagram">Instagram</Label>
                    <Input
                      id="builder-instagram"
                      defaultValue="https://instagram.com/horizonbuilders"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="builder-linkedin">LinkedIn</Label>
                    <Input
                      id="builder-linkedin"
                      defaultValue="https://linkedin.com/company/horizonbuilders"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="builder-active" defaultChecked />
                  <Label htmlFor="builder-active">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="builder-featured" defaultChecked />
                  <Label htmlFor="builder-featured">Featured Builder</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="builder-verified" defaultChecked />
                  <Label htmlFor="builder-verified">Verified Builder</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Builder Projects</CardTitle>
              <CardDescription>
                Manage projects associated with this builder
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Units</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Sunset Residences
                      </TableCell>
                      <TableCell>Residential</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell>120</TableCell>
                      <TableCell>Jan 12, 2023</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Horizon Heights
                      </TableCell>
                      <TableCell>Residential</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell>85</TableCell>
                      <TableCell>Mar 5, 2023</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Skyline Towers
                      </TableCell>
                      <TableCell>Commercial</TableCell>
                      <TableCell>Upcoming</TableCell>
                      <TableCell>45</TableCell>
                      <TableCell>Apr 18, 2023</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Builder Reviews</CardTitle>
              <CardDescription>
                Manage customer reviews for this builder
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <StarHalf className="h-5 w-5 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-lg font-medium">4.5 out of 5</span>
                  <span className="text-sm text-muted-foreground">
                    (28 reviews)
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  Export Reviews
                </Button>
              </div>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="Customer"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">John Davis</p>
                        <p className="text-xs text-muted-foreground">
                          2 months ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    </div>
                  </div>
                  <p>
                    Excellent quality construction and timely delivery. The team
                    at Horizon Builders was professional and responsive
                    throughout the entire process. Highly recommended!
                  </p>
                  <div className="flex justify-end gap-2 mt-2">
                    <Button variant="ghost" size="sm">
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="Customer"
                        />
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Sarah Miller</p>
                        <p className="text-xs text-muted-foreground">
                          3 months ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <p>
                    Great design and quality finishes. The only reason for 4
                    stars instead of 5 is that there were some minor delays in
                    the project completion. Otherwise, very satisfied with my
                    new home.
                  </p>
                  <div className="flex justify-end gap-2 mt-2">
                    <Button variant="ghost" size="sm">
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="Customer"
                        />
                        <AvatarFallback>RJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Robert Johnson</p>
                        <p className="text-xs text-muted-foreground">
                          4 months ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    </div>
                  </div>
                  <p>
                    Horizon Builders exceeded my expectations in every way. From
                    the initial consultation to the final walkthrough, they were
                    professional, transparent, and delivered exactly what they
                    promised. The quality of construction is outstanding.
                  </p>
                  <div className="flex justify-end gap-2 mt-2">
                    <Button variant="ghost" size="sm">
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm">
                      Delete
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
