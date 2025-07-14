"use client";

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
import { Switch } from "@/components/ui/switch";
import { FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { useProjectData } from "@/hooks/use-project-data";
import { Loader2, Search, Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Builder {
  _id: string;
  title: string;
}

interface Category {
  _id: string;
  title: string;
}

export function BasicInformation() {
  const form = useFormContext();
  const { categories, builders, isLoading, error } = useProjectData();
  const [openBuilder, setOpenBuilder] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Error loading data</CardDescription>
        </CardHeader>
        <CardContent>
          <FormMessage>{error.message}</FormMessage>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          Enter the basic details of the project
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              Project Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter project name"
              {...form?.register("name")}
            />
            {form?.formState?.errors?.name && (
              <FormMessage>
                {form?.formState?.errors?.name?.message?.toString() ??
                  "Name is required"}
              </FormMessage>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">
              Slug <span className="text-red-500">*</span>
            </Label>
            <Input
              id="slug"
              placeholder="project-slug"
              {...form?.register("slug")}
            />
            {form?.formState?.errors?.slug && (
              <FormMessage>
                {form?.formState?.errors?.slug?.message?.toString()}
              </FormMessage>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="builder">
              Builder <span className="text-red-500">*</span>
            </Label>
            <Popover open={openBuilder} onOpenChange={setOpenBuilder}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openBuilder}
                  className="w-full justify-between"
                >
                  {form?.watch("builder")
                    ? builders.find((builder) => builder._id === form?.watch("builder"))?.title
                    : "Select builder..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command shouldFilter={true}>
                  <CommandInput placeholder="Search builder..." />
                  <CommandEmpty>No builder found.</CommandEmpty>
                  <CommandGroup>
                    {builders.map((builder) => (
                      <CommandItem
                        key={builder._id}
                        value={builder.title}
                        onSelect={(value: string) => {
                          const selectedBuilder = builders.find(b => b.title === value);
                          if (selectedBuilder) {
                            form?.setValue("builder", selectedBuilder._id);
                          }
                          setOpenBuilder(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            form?.watch("builder") === builder._id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {builder.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {form?.formState?.errors?.builder && (
              <FormMessage>
                {form?.formState?.errors?.builder?.message?.toString()}
              </FormMessage>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-red-500">*</span>
            </Label>
            <Popover open={openCategory} onOpenChange={setOpenCategory}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCategory}
                  className="w-full justify-between"
                >
                  {form?.watch("category")
                    ? categories.find((category) => category._id === form?.watch("category"))?.name
                    : "Select category..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command shouldFilter={true}>
                  <CommandInput placeholder="Search category..." />
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((category) => (
                      <CommandItem
                        key={category._id}
                        value={category.name}
                        onSelect={(value: string) => {
                          const selectedCategory = categories.find(c => c.name === value);
                          if (selectedCategory) {
                            form?.setValue("category", selectedCategory._id);
                          }
                          setOpenCategory(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            form?.watch("category") === category._id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {category.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {form?.formState?.errors?.category && (
              <FormMessage>
                {form?.formState?.errors?.category?.message?.toString()}
              </FormMessage>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortDescription">
            Short Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="shortDescription"
            placeholder="Enter a short description of the project"
            className="min-h-[100px]"
            {...form?.register("shortDescription")}
          />
          {form?.formState?.errors?.shortDescription && (
            <FormMessage>
              {form?.formState?.errors?.shortDescription?.message?.toString()}
            </FormMessage>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={form?.watch("status")}
            onValueChange={(value) => form?.setValue("status", value)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pre-launch">Pre Launch</SelectItem>
              <SelectItem value="launch">Launch</SelectItem>
              <SelectItem value="under-construction">Under Construction</SelectItem>
              <SelectItem value="ready-to-move-in">Ready to Move In</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={form?.watch("featured")}
            onCheckedChange={(checked) => form?.setValue("featured", checked)}
          />
          <Label htmlFor="featured">Featured Project</Label>
        </div>
      </CardContent>
    </Card>
  );
}
