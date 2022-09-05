import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const DECODE_PREFIX = "data:image/png;base64,";
const API = "http://127.0.0.1:8000/photo/";

async function getSubmissionListWithContest() {
  return fetch(API + "submissions/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}

async function getUserList() {
  return fetch(API + "users/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}

export async function getStaticProps() {
  const submissionList = await getSubmissionListWithContest();
  const userList = await getUserList();
  return {
    props: {
      submissionList,
      userList,
    },
  };
}

function BlurImage({ url, user, description }) {
  const [isLoading, setLoading] = useState(true);
  if (!url.includes("data:image") && !url.includes("blob")) url = DECODE_PREFIX + url;

  return (
    <a href="#" className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 relative">
        <Image
          alt=""
          src={url}
          sizes="100%"
          layout="fill"
          objectfit="cover"
          className={
            ("group-hover:opacity-75 duration-700 ease-in-out",
              isLoading
                ? "grayscale blur-2xl scale-110"
                : "grayscale-0 blur-0 scale-100")
          }
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{user}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{description}</p>
    </a>
  );
}

function getUserName(userUUID, userList) {
  const result = userList.find(user => user.id === userUUID)
  return result.first_name + ' ' + result.last_name
}

export default function Home({ submissionList, userList }) {
  const [createObjectURL, setCreateObjectURL] = useState(null);

  function uploadToClient(event) {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setCreateObjectURL(reader.result);
      };

      reader.readAsDataURL(i);
    }
  }

  async function uploadToServer() {
    const body = new FormData();
    body.append("user", "5d2ee9f3-7f36-4861-ad59-4297aa96f932");
    body.append("contest", "29fd2e40-978a-4a5e-b2c6-901878489623");
    body.append("content", createObjectURL);
    body.append("description", "Submission POSTed");
    return fetch(API + "submissions/", {
      method: "POST",
      mode: "cors",
      body,
    }).then((data) => data.json());
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Revent</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Revent!</h1>
        <div className="grid grid-cols-4 gap-4">
          {submissionList.map(({ id, user, contest, content, description }) => (
            <BlurImage key={id} user={getUserName(user, userList)} url={content} description={description} />
          ))}
        </div>
        <div>
          <img src={createObjectURL} />
          <h4>Select Image</h4>
          <input type="file" name="myImage" onChange={uploadToClient} />
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => uploadToServer({ id: "ID" })}
          >
            Send to server
          </button>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
