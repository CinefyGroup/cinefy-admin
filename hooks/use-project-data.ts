"use client";

import { useState, useEffect } from "react";
import api from "@/axios-instance";

interface Category {
  _id: string;
  name: string;
}

interface Builder {
  _id: string;
  title: string;
}

export function useProjectData() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [builders, setBuilders] = useState<Builder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, buildersRes] = await Promise.all([
          api.get("/categories?limit=100"),
          api.get("/builders?limit=100"),
        ]);
        console.log(categoriesRes?.data);
        console.log(buildersRes?.data);
        setCategories(categoriesRes?.data?.docs);
        setBuilders(buildersRes?.data?.docs);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    categories,
    builders,
    isLoading,
    error,
  };
} 