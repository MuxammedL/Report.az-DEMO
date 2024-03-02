"use client";
import { useState } from "react";
import { createSlug } from "@/app/lib/functions";
import { useRouter } from "next/navigation";
import Form from "../components/Form/Form";
import { useSession } from "next-auth/react";
const AddNews = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [post, setPost] = useState({
    category: "",
    sub_category: "",
    title: "",
    text: "",
    image: "",
    important: false,
  });
  const createNews = async (e) => {
    e.preventDefault();
    setClicked(true);
    const currentDate = new Date();
    const isoDate = currentDate.toISOString();
    const keysWithEmptyValues = Object.keys(post).filter(
      (key) => post[key] === ""
    );
    if (!(keysWithEmptyValues.length > 0)) {
      setSubmitting(true);
      try {
        const response = await fetch("/api/news/new", {
          method: "POST",
          body: JSON.stringify({
            category: post.category,
            userId: session?.user.id,
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
      }
    }
  };
  return (
    <>
      <Form
        type={"Xəbər əlavə et"}
        clicked={clicked}
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createNews}
      />
    </>
  );
};

export default AddNews;
