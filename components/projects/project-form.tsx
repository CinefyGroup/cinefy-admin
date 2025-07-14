"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicInformation } from "./basic-information";
import { ProjectDetails } from "./project-details";
import { Media } from "./media";
import { Pricing } from "./pricing";
import { SEO } from "./seo";
import { toast } from "sonner";

const projectSchema = z.object({
  // Basic Information
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  builder: z.string().min(1, "Builder is required"),
  category: z.string().min(1, "Category is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  status: z.string().min(1, "Status is required"),
  featured: z.boolean(),

  // Project Details
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  startDate: z.string().min(1, "Start date is required"),
  completionDate: z.string().min(1, "Completion date is required"),
  possessionDate: z.string().optional(),
  amenities: z.object({
    swimmingPool: z.boolean(),
    gym: z.boolean(),
    garden: z.boolean(),
    parking: z.boolean(),
    security: z.boolean(),
    clubhouse: z.boolean(),
  }),

  // Media
  featuredImage: z.any(),
  galleryImages: z.array(z.any()),
  videoUrl: z.string().optional(),
  virtualTourUrl: z.string().optional(),

  // Pricing
  priceFrom: z.number().min(0, "Price must be positive"),
  priceTo: z.number().min(0, "Price must be positive"),
  pricePerSqFt: z.number().min(0, "Price must be positive"),
  currency: z.string().min(1, "Currency is required"),
  unitTypes: z.array(z.object({
    type: z.string().min(1, "Type is required"),
    area: z.number().min(0, "Area must be positive"),
    price: z.number().min(0, "Price must be positive"),
    totalUnits: z.number().min(0, "Total units must be positive"),
  })),
  totalUnits: z.number().min(0, "Total units must be positive"),
  availableUnits: z.number().min(0, "Available units must be positive"),
  paymentPlan: z.string().optional(),

  // SEO
  metaTitle: z.string().min(1, "Meta title is required"),
  metaDescription: z.string().min(1, "Meta description is required"),
  metaKeywords: z.string().min(1, "Meta keywords is required"),
  indexable: z.boolean(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  initialData?: Partial<ProjectFormValues>;
  onSubmit: (data: ProjectFormValues) => Promise<void>;
}

export function ProjectForm({ initialData, onSubmit }: ProjectFormProps) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      featured: false,
      amenities: {
        swimmingPool: false,
        gym: false,
        garden: false,
        parking: false,
        security: false,
        clubhouse: false,
      },
      galleryImages: [],
      unitTypes: [],
      indexable: true,
      ...initialData,
    },
  });

  const handleSubmit = async (data: ProjectFormValues) => {
    try {
      await onSubmit(data);
      toast.success("Project saved successfully");
    } catch (error) {
      toast.error("Failed to save project");
      console.error(error);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-5 w-full justify-start sticky -top-4 z-10 border-b">

            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="details">Project Details</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <BasicInformation />
          </TabsContent>

          <TabsContent value="details">
            <ProjectDetails />
          </TabsContent>

          <TabsContent value="media">
            <Media />
          </TabsContent>

          <TabsContent value="pricing">
            <Pricing />
          </TabsContent>

          <TabsContent value="seo">
            <SEO />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving..." : "Save Project"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
} 