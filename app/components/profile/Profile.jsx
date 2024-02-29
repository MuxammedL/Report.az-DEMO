import Image from "next/image";
import NewsCard from "../newsCard/NewsCard";
import "./_profile.scss";
const Profile = ({ user, data, handleEdit, handleDelete }) => {
  return (
    user && (
      <section className="author pt-20">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="author-block flex">
                <div className="name-position">
                  <h1 className="name">{user.fullName}</h1>
                </div>
                <div className="thumb">
                  <Image
                    src={user.image}
                    alt={user.fullName}
                    width="0"
                    height="0"
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <div className="author-news">
                <h2 className="section-title">Müəllifin xəbərləri</h2>
                <div className="news-list">
                  <div className="row">
                    {data.map((item) => (
                      <NewsCard
                        key={item._id}
                        post={item}
                        handleDelete={() => handleDelete && handleDelete(item)}
                        handleEdit={() => handleEdit && handleEdit(item)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default Profile;
