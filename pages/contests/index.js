import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useState } from "react";

function RenderContest({ contest }) {
    return (
        <>
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <img class="w-full" src="https://www.jquery-az.com/html/images/banana.jpg" alt="" />
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{contest.name}</div>
                    <p class="text-gray-700 text-base">
                        {contest.description}
                    </p>
                    <p class="text-gray-700 text-base">
                        {contest.date_start}
                    </p>
                </div>
            </div>
        </>
    )
}


export default function Home({ contestList }) {

    return (
        <div className={styles.container}>
            <Head>
                <title>Revent</title>
                <h1 className={styles.title}>Welcome to Revent!</h1>
            </Head>

            <main className={styles.contest_container}>

                <div className="grid grid-cols-4 gap-4">
                    {contestList.map((contest) => (
                        <RenderContest contest={contest} />
                        // <BlurImage key={id} user={getUserName(user, userList)} url={content} description={description} />
                    ))}
                </div>
            </main>
            <footer className={styles.footer}></footer>
        </div>
    );
}


const API = "http://127.0.0.1:8000/photo/";

async function getContestList() {
    return fetch(API + "contests/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
}


export async function getStaticProps() {
    const contestList = await getContestList();
    return {
        props: {
            contestList,
        },
    };
}