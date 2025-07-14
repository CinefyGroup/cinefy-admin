import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

export default function EditBannerPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the banner data based on the ID
  const bannerId = params.id;

  return (
    <Layout title="Edit Banner" action={<Button>Update</Button>}>
      <Card>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Banner Image</Label>
            <div className="border rounded-lg p-4">
              <div className="aspect-[3/1] w-full bg-muted rounded-md overflow-hidden mb-4">
                <img
                  src="/placeholder.svg?height=300&width=900"
                  alt="Banner preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button variant="outline" size="sm">
                Change Image
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="banner-title">
                Banner Title <span className="text-red-500">*</span>
              </Label>
              <Input id="banner-title" defaultValue="Summer Special Offers" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="banner-subtitle">Subtitle (Optional)</Label>
              <Input
                id="banner-subtitle"
                defaultValue="Limited Time Deals on Premium Properties"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="banner-description">Description (Optional)</Label>
            <Textarea
              id="banner-description"
              defaultValue="Enjoy exclusive summer discounts on select luxury properties. Book now to secure your dream home at special prices."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="banner-link">Link URL</Label>
              <Input id="banner-link" defaultValue="/offers/summer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="banner-link-text">Link Text (Optional)</Label>
              <Input id="banner-link-text" defaultValue="View Offers" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="banner-position">Position</Label>
              <Select defaultValue="home-top">
                <SelectTrigger id="banner-position">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home-top">Home Page - Top</SelectItem>
                  <SelectItem value="home-middle">
                    Home Page - Middle
                  </SelectItem>
                  <SelectItem value="home-bottom">
                    Home Page - Bottom
                  </SelectItem>
                  <SelectItem value="sidebar">Sidebar</SelectItem>
                  <SelectItem value="projects">Projects Page</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="banner-order">Display Order</Label>
              <Input id="banner-order" type="number" defaultValue="1" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="banner-start-date">Start Date</Label>
              <Input
                id="banner-start-date"
                type="date"
                defaultValue="2023-06-01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="banner-end-date">End Date (Optional)</Label>
              <Input
                id="banner-end-date"
                type="date"
                defaultValue="2023-08-31"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="banner-active" defaultChecked />
              <Label htmlFor="banner-active">Active</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="banner-open-new-tab" defaultChecked />
              <Label htmlFor="banner-open-new-tab">Open link in new tab</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Statistics</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-md p-4">
                <p className="text-sm text-muted-foreground">Impressions</p>
                <p className="text-2xl font-bold">12,458</p>
              </div>
              <div className="border rounded-md p-4">
                <p className="text-sm text-muted-foreground">Clicks</p>
                <p className="text-2xl font-bold">1,245</p>
              </div>
              <div className="border rounded-md p-4">
                <p className="text-sm text-muted-foreground">CTR</p>
                <p className="text-2xl font-bold">9.99%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
