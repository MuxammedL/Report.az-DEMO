"use state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./_form.scss";
import { useEffect, useState } from "react";
import { faXmark, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Form = ({ type, submitting, setPost, handleSubmit, post,clicked }) => {
  const [links, setLinks] = useState(null);
  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [info, setInfo] = useState(false);

  const handleSelectChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(`/api/links`);
        const data = await response.json();
        setLinks(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchLinks();
    const radio = document.querySelector('input[name="important"]');
    radio.click();
  }, []);

  useEffect(() => {
    setCategory(post.category);
  }, [post]);

  useEffect(() => {
    setSubCategories(
      category
        ? links?.find((item) => item.title === category).sub_categories
        : null
    );
  }, [category]);
  
  return (
    <>
      <section className="add-news">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="form-title">{type}</h1>
              <div className="add-news-inner">
                <form id="addNews" onSubmit={handleSubmit}>
                  <div className="input-group">
                    <label htmlFor="title">
                      Xəbərin başlığı
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={post.title}
                        className={`${
                          clicked && post.title.length == 0 ? "invalid" : ""
                        }`}
                        onChange={(e) =>
                          setPost({ ...post, title: e.target.value })
                        }
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
                        value={post.text}
                        className={`${clicked&&post.text.length==0?"invalid":""}`}
                        onChange={(e) =>
                          setPost({ ...post, text: e.target.value })
                        }
                      />
                    </label>
                    <button
                      type="button"
                      className="info"
                      onClick={() => setInfo(true)}
                    >
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
                        value={post.image}
                        className={`${clicked&&post.image.length==0?"invalid":""}`}
                        onChange={(e) =>
                          setPost({ ...post, image: e.target.value })
                        }
                      />
                    </label>
                  </div>
                  <div className="input-group selects">
                    <div className="group">
                      <span>Kateqoriya seç:</span>
                      <select
                        name="category"
                        id="category"
                        value={post.category}
                        className={`${
                          clicked && post.category.length == 0
                            ? "invalid"
                            : ""
                        }`}
                        onChange={(e) => {
                          setPost({ ...post, category: e.target.value });
                          handleSelectChange(e);
                        }}
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
                        value={post.sub_category}
                        className={`${clicked&&post.sub_category.length==0?"invalid":""}`}
                        onChange={(e) =>
                          setPost({ ...post, sub_category: e.target.value })
                        }
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
                        onChange={(e) => setPost({ ...post, important: false })}
                      />
                    </label>
                    <label htmlFor="important-true">
                      Hə
                      <input
                        type="radio"
                        name="important"
                        id="important-true"
                        value={true}
                        onChange={(e) => setPost({ ...post, important: true })}
                      />
                    </label>
                  </div>

                  <button className="btn" type="submit">
                    {submitting ? `${type} edilir...` : `${type} etmək`}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
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

export default Form;
