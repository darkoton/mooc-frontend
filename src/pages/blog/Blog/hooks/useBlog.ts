import { useEffect, useState } from "react";

import { blogService, type IBlog } from "@entities/blog";

export const useBlog = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const limit = 10;

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await blogService.getAll({ page, limit });
        setBlogs(
          data.results.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
        );
        setCount(data.count);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [page]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  const totalPages = Math.ceil(count / limit);

  return {
    blogs,
    page,
    isLoading,
    handlePageChange,
    totalPages,
  };
};
