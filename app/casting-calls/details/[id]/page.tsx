"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import api from "@/axios-instance";
import Layout from "@/components/component-layout";
import { CalendarDays, UserCircle2 } from "lucide-react";

export default function CastingCallDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [castingCall, setCastingCall] = useState<any>(null);
  const [tab, setTab] = useState("requirements");

  useEffect(() => {
    const fetchCastingCall = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/casting-calls/${params.id}`);
        setCastingCall(response.data);
      } catch (error) {
        toast({
          title: "Error loading casting call",
          description: "Please try again",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCastingCall();
  }, [params.id, toast]);

  if (loading) {
    return (
      <Layout title="Casting Call Details">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </Layout>
    );
  }

  if (!castingCall) {
    return (
      <Layout title="Casting Call Details">
        <div className="text-center text-gray-500 py-16">
          Casting call not found.
        </div>
      </Layout>
    );
  }

  // Helper: format date
  function formatDate(dateStr: string) {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // Helper: role display
  function roleDisplay(role: string, gender: string) {
    if (!role) return "-";
    let g = gender && gender !== "Any" ? gender.toLowerCase() : "";
    return g
      ? `${g.charAt(0).toUpperCase() + g.slice(1)} ${role.toLowerCase()}`
      : role;
  }

  return (
    <Layout title="Casting Call Details">
      <div className="max-w-2xl mx-auto w-full p-2 md:p-0">
        {/* Header Card */}
        <Card className="p-4 flex flex-col gap-3 mb-4">
          <div className="flex items-center gap-3">
            {castingCall.coverImage ? (
              <img
                src={castingCall.coverImage}
                alt="cover"
                className="w-20 h-20 rounded-lg object-cover border"
              />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
                <UserCircle2 className="w-10 h-10 text-gray-400" />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg md:text-xl leading-tight">
                  {castingCall.title}
                </h2>
                <span className="text-xs text-gray-400 ml-auto">
                  {/* TODO: show relative time */}
                </span>
              </div>
              <div className="text-gray-600 text-sm mt-1">
                {castingCall.subTitle}
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {castingCall.projectType && (
                  <Badge variant="secondary">{castingCall.projectType}</Badge>
                )}
                {castingCall.projectLanguage && (
                  <Badge variant="secondary">
                    {castingCall.projectLanguage}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <CalendarDays className="w-4 h-4 text-gray-500" />
            <span>Last date to apply :</span>
            <span className="font-semibold ml-1">
              {formatDate(castingCall.submissionDeadline)}
            </span>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="mb-2 w-full flex">
            <TabsTrigger
              value="requirements"
              className="flex-1 data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-900 rounded-t-md"
            >
              Requirements
            </TabsTrigger>
            <TabsTrigger value="more" className="flex-1">
              More Details
            </TabsTrigger>
          </TabsList>
          <TabsContent value="requirements">
            <div className="flex flex-col gap-4">
              {castingCall.requirements &&
              castingCall.requirements.length > 0 ? (
                castingCall.requirements.map((req: any, idx: number) => (
                  <div
                    key={idx}
                    className={`rounded-xl border ${
                      idx === 0
                        ? "bg-yellow-50 border-yellow-200"
                        : "bg-white border-gray-200"
                    } p-4 flex flex-col gap-2`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center">
                        <UserCircle2 className="w-7 h-7 text-green-700" />
                      </div>
                      <div>
                        <div className="font-semibold text-base">
                          {roleDisplay(req.role, req.gender)}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {req.age ? req.age : "-"} years
                        </div>
                      </div>
                    </div>
                    {req.otherDetails && req.otherDetails.trim() && (
                      <div className="mt-2">
                        <div className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mb-1">
                          Other details
                        </div>
                        <ul className="list-disc ml-6 text-sm text-gray-700 mt-1">
                          {req.otherDetails
                            .split(/\r?\n|\u2022|\*/)
                            .map((line: string, i: number) => {
                              const clean = line
                                .trim()
                                .replace(/^[-•*]+\s*/, "");
                              return clean ? <li key={i}>{clean}</li> : null;
                            })}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-center py-8">
                  No requirements listed.
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="more">
            <div className="flex flex-col gap-4">
              {/* Description and Source */}
              <Card className="p-4 flex flex-col gap-2">
                <div className="text-base text-gray-800 mb-2">
                  {castingCall.description}
                </div>
                {castingCall.sourceLink && (
                  <div className="mt-2">
                    <div className="font-semibold text-sm mb-1">Source :</div>
                    <a
                      href={castingCall.sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-50 text-blue-800 rounded-md px-3 py-2 w-fit hover:bg-blue-100 transition text-sm"
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="#2563eb"
                          strokeWidth="2"
                        />
                        <path
                          d="M8 12a4 4 0 0 1 4-4h2a4 4 0 1 1 0 8h-2a4 4 0 0 1-4-4Zm0 0h8"
                          stroke="#2563eb"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="truncate max-w-[180px] md:max-w-xs">
                        {castingCall.sourceLink.replace(/^https?:\/\//, "")}
                      </span>
                    </a>
                  </div>
                )}
              </Card>
              {/* Required Details */}
              <Card className="p-4">
                <div className="font-semibold mb-2">Required Details</div>
                <div className="flex flex-col gap-2 text-sm">
                  {/* Aggregate required details from all requirements */}
                  {(() => {
                    // Aggregate
                    let totalPhotos = 0;
                    let introVideos: string[] = [];
                    let perfVideos: string[] = [];
                    (castingCall.requirements || []).forEach((req: any) => {
                      totalPhotos += Number(
                        req.applicationRequirements?.uneditedPhotos?.count || 0
                      );
                      introVideos.push(
                        ...(req.applicationRequirements?.selfIntroductionVideo?.map(
                          (v: any) => v.duration
                        ) || [])
                      );
                      perfVideos.push(
                        ...(req.applicationRequirements?.performanceVideo?.map(
                          (v: any) => v.duration
                        ) || [])
                      );
                    });
                    // Helper to join unique durations
                    const joinDurations = (arr: string[]) => {
                      const uniq = Array.from(new Set(arr.filter(Boolean)));
                      return uniq.length ? uniq.join(", ") : "-";
                    };
                    return (
                      <>
                        <div className="flex items-center justify-between border-b border-dashed py-1">
                          <span>Unedited photos :</span>
                          <span className="font-medium">
                            {totalPhotos || "-"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-b border-dashed py-1">
                          <span>Self Introduction video :</span>
                          <span className="font-medium">
                            {joinDurations(introVideos)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-1">
                          <span>Performance video :</span>
                          <span className="font-medium">
                            {joinDurations(perfVideos)}
                          </span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
