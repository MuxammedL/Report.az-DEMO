import { getUser } from "@/app/lib/data";
import styles from "./postUser.module.css";
import Image from "next/image";

const PostUser = async ({ userId }) => {
  const user = await getUser(userId);
  const [item] = user;
  return (
    item && (
      <div className={styles.container}>
        <div className={styles.thumb}>
          <Image
            src={item.image}
            alt={item.username}
            title={item.username}
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className={styles.info}>{item.username}</div>
      </div>
    )
  );
};

export default PostUser;
