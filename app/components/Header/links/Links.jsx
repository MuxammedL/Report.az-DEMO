"use client";
import { getLinks } from "@/app/lib/data";
import Link from "next/link";
import { useEffect, useState } from "react";

const Links = () => {
  const [links, setLinks] = useState();
  const fetchData = async () => {
    try {
      setLinks(await getLinks());
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {links &&
        links.map((link, index) => (
          <li key={index}>
            <Link href={`/${link.url}`}>{link.title}</Link>
          </li>
        ))}
    </>
  );
};

export default Links;
