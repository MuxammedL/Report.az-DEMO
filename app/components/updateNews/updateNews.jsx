"use client";
import { getLinks } from "@/app/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faXmark } from "@fortawesome/free-solid-svg-icons";
import { convertToJSON, createSlug } from "@/app/lib/functions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const UpdateNews = ({ setUpdate, newsId }) => {
  const router = useRouter();
  const [links, setLinks] = useState(null);
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState(null);
  const [sub_category, setSubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [important, setImportant] = useState(false);
  const [post, setPost] = useState();
  const [info, setInfo] = useState(false);

  const handleShowBtn = () => {
    const body = document.querySelector("body");
    body.classList.remove("hidden-o");
    setUpdate(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isNotNull = true;
    const formData = {};
    for (const input of e.target.elements) {
      if (
        (input.tagName === "INPUT" ||
          input.tagName === "SELECT" ||
          input.tagName === "TEXTAREA") &&
        input.type !== "submit"
      ) {
        formData[input.name] = input.value;
        if (input.value == "") {
          input.classList.add("invalid");
          isNotNull = false;
        } else {
          input.classList.remove("invalid");
        }
      }
    }
    const currentDate = new Date();
    const isoDate = currentDate.toISOString();
    formData.date = isoDate;
    formData.userId = "65bd4808f1e5999380b13c97";
    formData.slug = createSlug(title);
    formData.important = important;
    if (isNotNull) {
      try {
        const res = await fetch(`http://localhost:4000/news/${newsId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          router.refresh();
          setUpdate(false);
          const body = document.querySelector("body");
          body.classList.remove("hidden-o");
        }
      } catch (err) {
        console.log(err);
        throw new Error("Failed to create news!");
      }
    }
  };

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setLinks(await getLinks());
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:4000/news/${newsId}`);
        setPost(await res.json());
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
    fetchLinks();
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    body.classList.add("hidden-o");
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setText(post.text);
      setCategory(post.category);
      setSubCategory(post.sub_category);
      setImportant(post.important);
    }
  }, [post]);

  useEffect(() => {
    setSubCategories(
      category
        ? links?.find((item) => item.title === category).sub_categories
        : null
    );
  }, [category, post]);
  return (
    <>
      {post && (
        <div className="add-news">
          <div className={`add-news-modals show`}>
            <div className="modals-inner">
              <form id="addNews" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="title">
                    Xəbərin başlığı
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={title}
                      onInput={(e) => setTitle(e.target.value)}
                    />
                  </label>
                </div>
                <div className="input-group">
                  <label htmlFor="text">
                    Xəbər haqqında məlumat
                    <textarea
                      type="text"
                      id="text"
                      name="text"
                      value={text}
                      onInput={(e) => setText(e.target.value)}
                    />
                  </label>
                  <button type="button" className="info" onClick={() => setInfo(true)}>
                  <FontAwesomeIcon icon={faCircleInfo} />
                </button>
                </div>
                <div className="input-group">
                  <label htmlFor="image-link">
                    Şəkil Linki
                    <input
                      type="text"
                      name="image"
                      id="image-link"
                      value={image}
                      onInput={(e) => setImage(e.target.value)}
                    />
                  </label>
                </div>
                <div className="input-group selects">
                  <div className="group">
                    <span>Kateqoriya seç:</span>
                    <select
                      name="category"
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value=""></option>
                      {links &&
                        links.slice(2).map((item, index) => (
                          <option key={index} value={item.title}>
                            {item.title}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="group">
                    <span>Alt kateqoriya seç:</span>
                    <select
                      name="sub_category"
                      id="sub_category"
                      value={sub_category}
                      onChange={(e) => setSubCategory(e.target.value)}
                    >
                      <option value=""></option>
                      {category &&
                        (subCategories && subCategories.length > 0 ? (
                          subCategories.map((item, index) => (
                            <option key={index} value={item.title}>
                              {item.title}
                            </option>
                          ))
                        ) : (
                          <option value={category}>{category}</option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="input-group radios">
                  <span>Vacib xəbərdir?</span>

                  <label htmlFor="important-false">
                    Yox
                    <input
                      type="radio"
                      name="important"
                      id="important-false"
                      value={false}
                      onChange={() => setImportant(false)}
                      checked={important === false}
                    />
                  </label>
                  <label htmlFor="important-true">
                    Hə
                    <input
                      type="radio"
                      name="important"
                      id="important-true"
                      value={true}
                      checked={important === true}
                      onChange={() => setImportant(true)}
                    />
                  </label>
                </div>

                <button className="btn" type="submit">
                  Əlavə et
                </button>
              </form>
              <div className="close-btn" onClick={handleShowBtn}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
          </div>
        </div>
      )}
      {info && (
        <div className="modal-info">
          <div className="modal-inner">
            <Image
              src="/images/text-info.png"
              fill
              sizes="cover"
              alt="background"
              style={{ objectFit: "contain" }}
            />
            <button  onClick={() => setInfo(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateNews;
