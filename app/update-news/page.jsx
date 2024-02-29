"use client";
import { useEffect, useState } from "react";
import { createSlug } from "@/app/lib/functions";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "../components/Form/Form";
const UpdateNews = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newsId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    category: "",
    sub_category: "",
    title: "",
    text: "",
    image: "",
    important: false,
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/news/${newsId}`);
      const data = await response.json();

      setPost({
        category: data.category,
        title: data.title,
        text: data.text,
        image: data.image,
        important: data.important,
        sub_category: data.sub_category,
      });
    };

    if (newsId) getPromptDetails();
  }, [newsId]);

  const updateNews = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!newsId) return alert("Missing PromptId!");
    const currentDate = new Date();
    const isoDate = currentDate.toISOString();
    try {
      const response = await fetch(`/api/news/${newsId}`, {
        method: "PATCH",
        body: JSON.stringify({
          category: post.category,
          sub_category: post.sub_category,
          title: post.title,
          text: post.text,
          image: post.image,
          important: post.important,
          slug: createSlug(post.title),
          date: isoDate,
        }),
      });

      if (response.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <>
      <Form
        type={"Xəbəri redaktə et"}
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updateNews}
      />
    </>
  );
};

export default UpdateNews;
