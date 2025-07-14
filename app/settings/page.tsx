import { TableCell } from "@/components/ui/table";
import { TableBody } from "@/components/ui/table";
import { TableHead } from "@/components/ui/table";
import { TableRow } from "@/components/ui/table";
import { TableHeader } from "@/components/ui/table";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ProfileSettings } from "@/components/settings";
import Layout from "@/components/component-layout";

export default function SettingsPage() {
  return (
    <Layout title="Settings">
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="w-full justify-start sticky -top-4 z-10 border-b">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure email and system notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">New Enquiry Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when new enquiries are submitted
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Admin Login Alerts</h4>
                    <p className="text-sm text-muted-foreground">
                      Get notified when admins log in to the system
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Project Updates</h4>
                    <p className="text-sm text-muted-foreground">
                      Notifications for project status changes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Weekly Reports</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly summary reports via email
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Manage search engine optimization settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Default Meta Title</Label>
                <Input
                  id="meta-title"
                  defaultValue="Property Admin | Real Estate Management Platform"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">
                  Default Meta Description
                </Label>
                <Textarea
                  id="meta-description"
                  defaultValue="Property Admin is a comprehensive platform for managing property listings, real estate projects, and more."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Default Meta Keywords</Label>
                <Input
                  id="meta-keywords"
                  defaultValue="property, real estate, property management, listings"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="enable-sitemap" defaultChecked />
                <Label htmlFor="enable-sitemap">
                  Generate Sitemap Automatically
                </Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for third-party integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    defaultValue="sk_live_51NzUBTGQOF5YrHMVZj6YyDs"
                    type="password"
                  />
                  <Button variant="outline">Reveal</Button>
                  <Button variant="outline">Regenerate</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use this key for API access to your platform data
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  defaultValue="https://property-admin.com/api/webhook"
                />
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="font-medium">Third-Party Integrations</h4>

                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Google Maps API</h5>
                    <p className="text-sm text-muted-foreground">
                      For property location mapping
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      className="w-64"
                      defaultValue="AIzaSyC5XhQ3a5eNGDY"
                      type="password"
                    />
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Payment Gateway</h5>
                    <p className="text-sm text-muted-foreground">
                      For processing payments
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      className="w-64"
                      defaultValue="pk_live_51NzUBTGQOF5YrHMV"
                      type="password"
                    />
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
              <CardDescription>
                View system audit logs and admin actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Admin</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>Created</TableCell>
                      <TableCell>Project: Sunset Residences</TableCell>
                      <TableCell>192.168.1.1</TableCell>
                      <TableCell>2 hours ago</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Sarah Miller</TableCell>
                      <TableCell>Updated</TableCell>
                      <TableCell>Builder: Horizon Builders</TableCell>
                      <TableCell>192.168.1.2</TableCell>
                      <TableCell>5 hours ago</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Robert Johnson</TableCell>
                      <TableCell>Responded</TableCell>
                      <TableCell>Enquiry #12345</TableCell>
                      <TableCell>192.168.1.3</TableCell>
                      <TableCell>Yesterday</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Emma Wilson</TableCell>
                      <TableCell>Published</TableCell>
                      <TableCell>Blog: Top 10 Luxury Properties</TableCell>
                      <TableCell>192.168.1.4</TableCell>
                      <TableCell>Yesterday</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Michael Brown</TableCell>
                      <TableCell>Created</TableCell>
                      <TableCell>Category: Waterfront Properties</TableCell>
                      <TableCell>192.168.1.5</TableCell>
                      <TableCell>2 days ago</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
