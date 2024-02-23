"use client";
import { getLinks } from "@/app/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./_addNews.scss";
import { useEffect, useState } from "react";
import { faXmark, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { createSlug } from "@/app/lib/functions";
import { useRouter } from "next/navigation";
import Image from "next/image";
const AddNews = () => {
  const router = useRouter();
  const [links, setLinks] = useState(null);
  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [important, setImportant] = useState(false);
  const [info, setInfo] = useState(false);
  const handleShowBtn = () => {
    setShow(!show);
  };
  const handleSelectChange = (e) => {
    setCategory(e.target.value);
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
        const res = await fetch("http://localhost:4000/news", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          router.refresh();
          setShow(false);
          for (const input of e.target.elements) {
            if (
              (input.tagName === "INPUT" ||
                input.tagName === "SELECT" ||
                input.tagName === "TEXTAREA") &&
              input.type !== "submit"
            ) {
              input.value = "";
            }
          }
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
        console.error("Error fetching posts:", error);
      }
    };
    fetchLinks();
    const radio = document.querySelector('input[name="important"]');
    radio.click();
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    show ? body.classList.add("hidden-o") : body.classList.remove("hidden-o");
  }, [show]);

  useEffect(() => {
    setSubCategories(
      category
        ? links?.find((item) => item.title === category).sub_categories
        : null
    );
  }, [category]);
  return (
    <>
      <div className="add-news">
        <button className="btn" onClick={handleShowBtn}>
          Xəbər Əlavə et
        </button>
        <div className={`add-news-modals ${show && "show"}`}>
          <div className="modals-inner">
            <form id="addNews" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="title">
                  Xəbərin başlığı
                  <input
                    type="text"
                    id="title"
                    name="title"
                    onInput={(e) => setTitle(e.target.value)}
                  />
                </label>
              </div>
              <div className="input-group">
                <label htmlFor="text">
                  Xəbər haqqında məlumat
                  <textarea type="text" id="text" name="text" />
                </label>
                <button type="button" className="info" onClick={() => setInfo(true)}>
                  <FontAwesomeIcon icon={faCircleInfo} />
                </button>
              </div>
              <div className="input-group">
                <label htmlFor="image-link">
                  Şəkil Linki
                  <input type="text" name="image" id="image-link" />
                </label>
              </div>
              <div className="input-group selects">
                <div className="group">
                  <span>Kateqoriya seç:</span>
                  <select
                    name="category"
                    id="category"
                    onChange={handleSelectChange}
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
                  <select name="sub_category" id="sub_category">
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
                    onClick={() => setImportant(false)}
                  />
                </label>
                <label htmlFor="important-true">
                  Hə
                  <input
                    type="radio"
                    name="important"
                    id="important-true"
                    value={true}
                    onClick={() => setImportant(true)}
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
            <button onClick={() => setInfo(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNews;
