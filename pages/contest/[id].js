import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import styles from "../../styles/Home.module.css";
import {
  getSubmissionsFromContest,
  getUserList,
  postSubmission,
} from "../utils.js";

const DECODE_PREFIX = "data:image/png;base64,";

export default function contest({ contestId, submissions, userList }) {
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [submissionDescription, setSubmissionDescription] = useState("");

  // Uploads photo to show before submitting to server
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

  function changeDescription(event) {
    setSubmissionDescription(event.target.value);
  }

  async function uploadToServer() {
    const body = new FormData();
    body.append("user", "5d2ee9f3-7f36-4861-ad59-4297aa96f932");
    body.append("contest", contestId);
    body.append("content", createObjectURL);
    body.append("description", submissionDescription);
    postSubmission(body).then(() => Router.reload(window.location.pathname));
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Revent</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Revent!</h1>
        <div className="grid grid-cols-3 gap-4">
          {submissions.map(({ id, user, content, description }) => (
            <BlurImage
              key={id}
              contestId={contestId}
              submissionId={id}
              user={getUserName(user, userList)}
              url={content}
              description={description}
            />
          ))}
        </div>
        <div>
          <h4>Select Image</h4>
          <input type="file" name="myImage" onChange={uploadToClient} />

          {createObjectURL && (
            <div>
              <p>Description:</p>
              <input
                type="text"
                name="description"
                className="w-96 border-2 border-b-black"
                onChange={changeDescription}
              />
              <img className="w-96 h-96" src={createObjectURL} />
              <button
                className="btn btn-primary w-96 border-2 border-black"
                type="submit"
                onClick={() => uploadToServer({ id: "ID" })}
              >
                Send to server
              </button>
            </div>
          )}
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  let contestId = context.params.id;
  let submissions;
  let userList;
  try {
    submissions = await getSubmissionsFromContest(contestId);
    userList = await getUserList();
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      contestId,
      submissions,
      userList,
    },
  };
}

function BlurImage({ contestId, submissionId, url, user, description }) {
  const [isLoading, setLoading] = useState(true);
  if (!url.includes("data:image") && !url.includes("blob"))
    url = DECODE_PREFIX + url;

  return (
    <div>
      <Link href={`/contest/${contestId}/submission/${submissionId}`}>
        <div className="w-96 aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-13 relative">
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
      </Link>

      <h3 className="mt-4 text-sm text-gray-700">{user}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{description}</p>
    </div>
  );
}

function getUserName(userUUID, userList) {
  const result = userList.find((user) => user.id === userUUID);
  return result.first_name + " " + result.last_name;
}
