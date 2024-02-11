import { getUser } from "@/app/lib/data";
import styles from "./postUser.module.css";
import Image from "next/image";

const PostUser = async ({ userId }) => {
  const user = await getUser(userId);
  return (
    user && (
      <div className={styles.container}>
        <div className={styles.thumb}>
          <Image
            src={user.image}
            alt={user.username}
            title={user.username}
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className={styles.info}>{user.username}</div>
      </div>
    )
  );
};

export default PostUser;
