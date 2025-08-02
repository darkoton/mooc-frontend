import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { blogService, type IBlog } from "@entities/blog";

export const useBlogItem = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<IBlog | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await blogService.getById(id!);
      setBlog(data);
    };

    fetchData();
  }, [id]);

  return { blog };
};
