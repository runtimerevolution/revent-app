import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useState } from "react";
import LoginComponent from "../../components/Login";
import { useSession, signIn, signOut } from "next-auth/react"

function RenderContest(props) {
    const { contest } = props
    const { data } = useSession()
    console.log("DATA SESSION!", data)
    return (
        <>
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <img class="w-full" src="https://www.thoughtco.com/thmb/LIkTVpCr3NAa7qJW7D57BXgRiJA=/3396x2547/smart/filters:no_upscale()/film-photography-592347645-59e4d0609abed500119e7b14.jpg" alt="" />

                <div class="px-6 py-4 text-center">
                    <div class="font-bold text-xl mb-2">{contest.name}</div>
                    <p class="text-gray-700 text-base">
                        {contest.description}

                    </p>
                    <p class="text-gray-700 text-base">
                        <a>End date: </a>
                        {contest.date_end.slice(0, 10)}
                    </p>
                </div>
            </div>
        </>
    )
}


export default function Home(props) {

    const { contestList } = props
    return (
        <div class="p-8 bg-gray-300">
            <LoginComponent />
            <div className="px-8">
                <main className="min-h-screen py-8 px-20 flex-1 flex flex-col">
                    <div className="grid grid-cols-4 gap-4">
                        {contestList.map((contest) => (
                            <RenderContest contest={contest} />
                        ))}
                    </div>
                </main>
            </div>
        </div >
    );
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
async function getContestList() {
    return fetch(NEXT_PUBLIC_API_URL + "contests/", {
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