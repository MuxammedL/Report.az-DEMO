"use client";
import { getUser } from "@/app/lib/data";
import styles from "./postUser.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PostUser = ({ userId, post }) => {
  const [user, setUser] = useState();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/user`);
      const data = await response.json();
      setUser(data);
    };
    fetchPosts();
  }, []);
  const handleProfileClick = () => {
    if (session?.user.id === userId) {
      router.push("/author");
    } else {
      router.push(`/author/${userId}`);
    }
  };
  return (
    user && (
      <div className={styles.container} onClick={handleProfileClick}>
        <div className={styles.thumb}>
          <Image
            src={user.image}
            alt={user.fullName}
            title={user.fullName}
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className={styles.info}>{user.fullName}</div>
      </div>
    )
  );
};

export default PostUser;
