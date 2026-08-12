"use client";

import { createContext, useState } from "react";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogData, setBlogData] = useState({
    title: "",
    postSlug: "",
    bannerAltText: "",
    metaTitle: "",
    metaDescription: "",
    shortDesc: "",
    content: null,
    image: "/images/blog-banner.png",
    categoryId: "",
  });
  const [control, setControl] = useState(false);

  return (
    <BlogContext.Provider
      value={{ blogData, setBlogData, control, setControl }}
    >
      {children}
    </BlogContext.Provider>
  );
};
