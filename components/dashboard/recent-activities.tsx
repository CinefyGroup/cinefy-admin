import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivities() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">John Doe</p>
          <p className="text-sm text-muted-foreground">Added a new project: "Sunset Residences"</p>
          <p className="text-xs text-muted-foreground">2 hours ago</p>
        </div>
      </div>

      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sarah Miller</p>
          <p className="text-sm text-muted-foreground">Updated builder profile: "Horizon Builders"</p>
          <p className="text-xs text-muted-foreground">5 hours ago</p>
        </div>
      </div>

      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>RJ</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Robert Johnson</p>
          <p className="text-sm text-muted-foreground">Responded to 5 enquiries</p>
          <p className="text-xs text-muted-foreground">Yesterday</p>
        </div>
      </div>

      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>EW</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Emma Wilson</p>
          <p className="text-sm text-muted-foreground">Published a new blog post: "Top 10 Luxury Properties"</p>
          <p className="text-xs text-muted-foreground">Yesterday</p>
        </div>
      </div>

      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>MB</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Michael Brown</p>
          <p className="text-sm text-muted-foreground">Added a new category: "Waterfront Properties"</p>
          <p className="text-xs text-muted-foreground">2 days ago</p>
        </div>
      </div>
    </div>
  )
}

