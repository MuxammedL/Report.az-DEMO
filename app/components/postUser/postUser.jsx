import { getUser } from "@/app/lib/data";
import styles from "./postUser.module.css";
import Image from "next/image";

const PostUser = async ({ userId }) => {
  const user = await getUser(userId);
  return (
    user && (
      <div className={styles.container}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>{user.username}</span>
        <Image src={user.image} width={50} height={50} alt={user.username} />
      </div>
    )
  );
};

export default PostUser;
