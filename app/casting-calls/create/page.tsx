"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Upload, Plus, Trash2 } from "lucide-react";
import Layout from "@/components/component-layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import api from "@/axios-instance";
import { useToast } from "@/hooks/use-toast";

interface Requirement {
  role: string;
  gender: string;
  age: string;
  otherDetails?: string;
  applicationRequirements: {
    performanceVideo: string[];
    selfIntroductionVideo: string[];
    uneditedPhotos: string;
  };
}

export default function CreateCastingCallPage() {
  // State for basic casting call info
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectLanguage, setProjectLanguage] = useState("");
  const [sourceLink, setSourceLink] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );
  const [status, setStatus] = useState(true);
  const { toast } = useToast();

  // State for requirements array
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      role: "",
      gender: "",
      age: "",
      otherDetails: "",
      applicationRequirements: {
        performanceVideo: [],
        selfIntroductionVideo: [],
        uneditedPhotos: "",
      },
    },
  ]);

  // Validation state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Add new requirement
  const addRequirement = () => {
    setRequirements([
      ...requirements,
      {
        role: "",
        gender: "",
        age: "",
        otherDetails: "",
        applicationRequirements: {
          performanceVideo: [],
          selfIntroductionVideo: [],
          uneditedPhotos: "",
        },
      },
    ]);
  };

  // Remove requirement
  const removeRequirement = (index: number) => {
    if (requirements.length > 1) {
      setRequirements(requirements.filter((_, i) => i !== index));
    }
  };

  // Update requirement
  const updateRequirement = (index: number, field: keyof Requirement, value: any) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[index] = { ...updatedRequirements[index], [field]: value };
    setRequirements(updatedRequirements);
  };

  // Update application requirements
  const updateApplicationRequirements = (
    index: number,
    field: string,
    value: any
  ) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[index] = {
      ...updatedRequirements[index],
      applicationRequirements: {
        ...updatedRequirements[index].applicationRequirements,
        [field]: value,
      },
    };
    setRequirements(updatedRequirements);
  };

  // Handlers for checkboxes
  const handlePerformanceVideoChange = (requirementIndex: number, value: string, checked: boolean) => {
    const currentVideos = requirements[requirementIndex].applicationRequirements.performanceVideo;
    const updatedVideos = checked 
      ? [...currentVideos, value] 
      : currentVideos.filter((v) => v !== value);
    updateApplicationRequirements(requirementIndex, "performanceVideo", updatedVideos);
  };

  const handleIntroVideoChange = (requirementIndex: number, value: string, checked: boolean) => {
    const currentVideos = requirements[requirementIndex].applicationRequirements.selfIntroductionVideo;
    const updatedVideos = checked 
      ? [...currentVideos, value] 
      : currentVideos.filter((v) => v !== value);
    updateApplicationRequirements(requirementIndex, "selfIntroductionVideo", updatedVideos);
  };

  // Handler for file input
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
      setCoverImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Helper functions to map value to label for durations
  function labelForPerformance(val: string) {
    switch (val) {
      case "performance-30s":
        return "30 seconds";
      case "performance-1m":
        return "1 minute";
      case "performance-2m":
        return "2 minute";
      case "performance-3m":
        return "3 minute";
      default:
        return val;
    }
  }
  function labelForIntro(val: string) {
    switch (val) {
      case "intro-30s":
        return "30 seconds";
      case "intro-1m":
        return "1 minute";
      case "intro-2m":
        return "2 minute";
      case "intro-3m":
        return "3 minute";
      default:
        return val;
    }
  }

  // Submit handler
  const handleSubmit = async () => {
    // Validate required fields
    const newErrors: { [key: string]: string } = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!subTitle.trim()) newErrors.subTitle = "SubTitle is required";
    if (!shortDescription.trim())
      newErrors.shortDescription = "Description is required";
    if (!projectType) newErrors.projectType = "Project type is required";
    if (!projectLanguage)
      newErrors.projectLanguage = "Project language is required";
    if (!lastDate) newErrors.lastDate = "Submission deadline is required";
    if (!coverImage) newErrors.coverImage = "Cover image is required";
    
    // Validate requirements
    requirements.forEach((req, index) => {
      if (!req.role) newErrors[`role-${index}`] = "Role is required";
      if (!req.gender) newErrors[`gender-${index}`] = "Gender is required";
      if (!req.age) newErrors[`age-${index}`] = "Age is required";
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast({
        title: "Please fill all required fields",
        description: "Check the form for missing information.",
        variant: "destructive",
      });
      return;
    }
    try {
      // Prepare FormData for multipart/form-data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subTitle", subTitle);
      formData.append("description", shortDescription);
      formData.append("sourceLink", sourceLink);
      if (coverImage) {
        formData.append("coverImage", coverImage);
      }
      formData.append("projectType", projectType);
      formData.append("projectLanguage", projectLanguage);
      formData.append("submissionDeadline", lastDate);
      formData.append("status", JSON.stringify(status));
      
      // Prepare requirements array
      const requirementsData = requirements.map((req) => ({
        role: req.role,
        gender: req.gender,
        age: req.age,
        otherDetails: req.otherDetails,
        applicationRequirements: {
          performanceVideo: req.applicationRequirements.performanceVideo.map((d) => ({ duration: labelForPerformance(d) })),
          selfIntroductionVideo: req.applicationRequirements.selfIntroductionVideo.map((d) => ({ duration: labelForIntro(d) })),
          uneditedPhotos: { count: req.applicationRequirements.uneditedPhotos ? Number(req.applicationRequirements.uneditedPhotos) : 0 },
        },
      }));
      
      formData.append("requirements", JSON.stringify(requirementsData));

      await api.post("/casting-calls", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "Casting call created successfully",
      });
    } catch (error) {
      console.error("Error submitting casting call:", error);
      toast({
        title: "Error submitting casting call",
        description: "Please try again",
      });
    }
  };

  return (
    <Layout
      title="Create Casting Call"
      action={
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSubmit}>Save Casting Call</Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-5">
          {/* Casting Call Details */}
          <Card>
            <CardHeader>
              <CardTitle>Casting Call Details</CardTitle>
              <CardDescription>
                Enter the main details for the casting call
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="casting-title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="casting-title"
                  placeholder="Enter casting call title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="casting-subTitle">
                  SubTitle <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="casting-subTitle"
                  placeholder="Enter casting call subTitle"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                />
                {errors.subTitle && (
                  <p className="text-xs text-red-500 mt-1">{errors.subTitle}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="short-description">
                  Short Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="short-description"
                  placeholder="Enter a short description"
                  className="min-h-[100px]"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                />
                {errors.shortDescription && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.shortDescription}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Project Info */}
          <Card>
            <CardHeader>
              <CardTitle>Project Info</CardTitle>
              <CardDescription>
                Project type, language, and source
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="project-type">
                    Project Type <span className="text-red-500">*</span>
                  </Label>
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger id="project-type">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Movie">Movie</SelectItem>
                      <SelectItem value="Web series">Web Series</SelectItem>
                      <SelectItem value="Short film">Short Film</SelectItem>
                      <SelectItem value="Documentary">Documentary</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.projectType && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.projectType}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-language">
                    Project Language <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={projectLanguage}
                    onValueChange={setProjectLanguage}
                  >
                    <SelectTrigger id="project-language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Malayalam">Malayalam</SelectItem>
                      <SelectItem value="Tamil">Tamil</SelectItem>
                      <SelectItem value="Telugu">Telugu</SelectItem>
                      <SelectItem value="Kannada">Kannada</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.projectLanguage && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.projectLanguage}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="source-link">Source Link</Label>
                <Input
                  id="source-link"
                  placeholder="Enter source link"
                  value={sourceLink}
                  onChange={(e) => setSourceLink(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-date">
                  Last Date to Apply <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="last-date"
                  type="date"
                  value={lastDate}
                  onChange={(e) => setLastDate(e.target.value)}
                />
                {errors.lastDate && (
                  <p className="text-xs text-red-500 mt-1">{errors.lastDate}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Role Requirements</h3>
              <Button onClick={addRequirement} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Role
              </Button>
            </div>
            {requirements.map((requirement, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Role {index + 1}</CardTitle>
                    {requirements.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeRequirement(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>
                        Role <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup
                        className="flex flex-col gap-2"
                        value={requirement.role}
                        onValueChange={(value) => updateRequirement(index, "role", value)}
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Actor" id={`role-actor-${index}`} />
                          <Label htmlFor={`role-actor-${index}`}>Actor</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Actress" id={`role-actress-${index}`} />
                          <Label htmlFor={`role-actress-${index}`}>Actress</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Lead Actor" id={`role-lead-actor-${index}`} />
                          <Label htmlFor={`role-lead-actor-${index}`}>Lead Actor</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Lead Actress" id={`role-lead-actress-${index}`} />
                          <Label htmlFor={`role-lead-actress-${index}`}>Lead Actress</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Child Actor" id={`role-child-actor-${index}`} />
                          <Label htmlFor={`role-child-actor-${index}`}>Child Actor</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Child Actress" id={`role-child-actress-${index}`} />
                          <Label htmlFor={`role-child-actress-${index}`}>Child Actress</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Director" id={`role-director-${index}`} />
                          <Label htmlFor={`role-director-${index}`}>Director</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Assistant Director" id={`role-assistant-director-${index}`} />
                          <Label htmlFor={`role-assistant-director-${index}`}>Assistant Director</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Associate Director" id={`role-associate-director-${index}`} />
                          <Label htmlFor={`role-associate-director-${index}`}>Associate Director</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Editor" id={`role-editor-${index}`} />
                          <Label htmlFor={`role-editor-${index}`}>Editor</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Cinematographer" id={`role-cinematographer-${index}`} />
                          <Label htmlFor={`role-cinematographer-${index}`}>Cinematographer</Label>
                        </div>
                      </RadioGroup>
                      {errors[`role-${index}`] && (
                        <p className="text-xs text-red-500 mt-1">{errors[`role-${index}`]}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>
                        Gender <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup
                        className="flex flex-col gap-2"
                        value={requirement.gender}
                        onValueChange={(value) => updateRequirement(index, "gender", value)}
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Male" id={`gender-male-${index}`} />
                          <Label htmlFor={`gender-male-${index}`}>Male</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Female" id={`gender-female-${index}`} />
                          <Label htmlFor={`gender-female-${index}`}>Female</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Transgender" id={`gender-transgender-${index}`} />
                          <Label htmlFor={`gender-transgender-${index}`}>Transgender</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="Any" id={`gender-any-${index}`} />
                          <Label htmlFor={`gender-any-${index}`}>Any</Label>
                        </div>
                      </RadioGroup>
                      {errors[`gender-${index}`] && (
                        <p className="text-xs text-red-500 mt-1">{errors[`gender-${index}`]}</p>
                      )}
                      <div className="space-y-2 mt-4">
                        <Label htmlFor={`age-${index}`}>
                          Age <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id={`age-${index}`}
                          type="text"
                          placeholder="Enter age or 'Any'"
                          value={requirement.age}
                          onChange={(e) => updateRequirement(index, "age", e.target.value)}
                        />
                        {errors[`age-${index}`] && (
                          <p className="text-xs text-red-500 mt-1">{errors[`age-${index}`]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`other-details-${index}`}>Other Details</Label>
                    <Textarea
                      id={`other-details-${index}`}
                      placeholder="Enter any other details for this role"
                      className="min-h-[100px]"
                      value={requirement.otherDetails}
                      onChange={(e) => updateRequirement(index, "otherDetails", e.target.value)}
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Performance Video</Label>
                      <div className="flex flex-wrap gap-4">
                        {[
                          { label: "30 seconds", value: "performance-30s" },
                          { label: "1 minute", value: "performance-1m" },
                          { label: "2 minute", value: "performance-2m" },
                          { label: "3 minute", value: "performance-3m" },
                        ].map((item) => (
                          <div key={item.value} className="flex items-center gap-2">
                            <Checkbox
                              id={`${item.value}-${index}`}
                              checked={requirement.applicationRequirements.performanceVideo.includes(item.value)}
                              onCheckedChange={(checked) =>
                                handlePerformanceVideoChange(index, item.value, !!checked)
                              }
                            />
                            <Label htmlFor={`${item.value}-${index}`}>{item.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Self Introduction Video</Label>
                      <div className="flex flex-wrap gap-4">
                        {[
                          { label: "30 seconds", value: "intro-30s" },
                          { label: "1 minute", value: "intro-1m" },
                          { label: "2 minute", value: "intro-2m" },
                          { label: "3 minute", value: "intro-3m" },
                        ].map((item) => (
                          <div key={item.value} className="flex items-center gap-2">
                            <Checkbox
                              id={`${item.value}-${index}`}
                              checked={requirement.applicationRequirements.selfIntroductionVideo.includes(item.value)}
                              onCheckedChange={(checked) =>
                                handleIntroVideoChange(index, item.value, !!checked)
                              }
                            />
                            <Label htmlFor={`${item.value}-${index}`}>{item.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`unedited-photos-${index}`}>Unedited Photos (count)</Label>
                      <Input
                        id={`unedited-photos-${index}`}
                        type="number"
                        placeholder="Enter number of photos"
                        value={requirement.applicationRequirements.uneditedPhotos}
                        onChange={(e) => updateApplicationRequirements(index, "uneditedPhotos", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar: Cover Image */}
        <div className="space-y-5">
          {/* Cover Image */}
          <Card>
            <CardHeader>
              <CardTitle>Cover Image <span className="text-red-500">*</span></CardTitle>
              <CardDescription>
                Upload a cover image for the casting call
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop or click to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  Recommended size: 1920 x 600 pixels
                </p>
                <Button variant="outline" size="sm" className="mt-2" asChild>
                  <label htmlFor="cover-image-input">Select File</label>
                </Button>
                <input
                  id="cover-image-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverImageChange}
                />
                {coverImage && (
                  <>
                    <p className="text-xs text-green-600 mt-2">
                      {coverImage.name}
                    </p>
                    {coverImagePreview && (
                      <img
                        src={coverImagePreview}
                        alt="Cover preview"
                        className="mt-2 rounded-md max-h-40 object-contain border"
                      />
                    )}
                  </>
                )}
              </div>
              {errors.coverImage && (
                <p className="text-xs text-red-500 mt-1">{errors.coverImage}</p>
              )}
            </CardContent>
          </Card>
          {/* Status Toggle */}
          <div className="flex items-center gap-2 mt-4">
            <Switch id="status-toggle" checked={status} onCheckedChange={setStatus} />
            <Label htmlFor="status-toggle">{status ? "Active" : "Inactive"}</Label>
          </div>
        </div>
      </div>
    </Layout>
  );
}
