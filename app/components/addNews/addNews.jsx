"use client";
import { getLinks } from "@/app/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./_addNews.scss";
import { useEffect, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const AddNews = () => {
  const [links, setLinks] = useState(null);
  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [show, setShow] = useState(false);
  const handleShowBtn = () => {
    setShow(!show);
  };
  const handleSelectChange = (e) => {
    setCategory(e.target.value);
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
  }, []);
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
            <form>
              <div className="input-group">
                <label htmlFor="title">
                  Xəbərin başlığı
                  <input type="text" id="title" name="title" />
                </label>
                <label htmlFor="text">
                  Xəbər haqqında məlumat
                  <textarea type="text" id="text" name="text" rows={15} />
                </label>
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
                    {category &&
                      (subCategories && subCategories.length > 0 ? (
                        subCategories.map((item, index) => (
                          <option key={index} value={item.title}>
                            {item.title}
                          </option>
                        ))
                      ) : (
                        <option value="Yoxdur">Yoxdur</option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="input-group radios">
                <span>Vacib xəbərdir?</span>
                <label htmlFor="important-true">
                  Hə
                  <input
                    type="radio"
                    name="important"
                    id="important-true"
                    value="true"
                  />
                </label>
                <label htmlFor="important-false">
                  Yox
                  <input
                    type="radio"
                    name="important"
                    id="important-false"
                    value="false"
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
    </>
  );
};

export default AddNews;
