import Head from "next/head";
import { Navbar } from "@/components/Navbar";
import { Libre_Baskerville } from "next/font/google";
import Image from "next/image";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>ananthp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="h-screen flex-col px-20">
        <div className="flex">
          <div className="m-auto mt-[5rem]">
            <Navbar></Navbar>
            <div className="flex items-start md:items-center my-2 flex-col md:flex-row">
              <Image
                alt="Ananth Preetham"
                src="/memoji.png"
                width={100}
                height={100}
                priority
              />
            </div>
            <h1
              className={`font-semibold text-2xl font-serif text-white ${libreBaskerville}`}
            >
              Ananth Preetham
            </h1>
            <div className="my-5 sm:max-w-[460px] max-w-2xl text-neutral-200">
              Hey - I'm Ananth (Uh-Nun-t). I'm the co-founder of{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://matherium.com"
              >
                Matherium
              </a>{" "}
              where we're building AI call agents to help businesses. I love to
              hack things together to build better things. <br></br>
              <br></br>I like to write sometimes and I love good movies and TV
              shows. Here's my{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://ananthp.notion.site/Movie-Tracker-6857fb6ce4ea438592ee5d56ccf14260?pvs=4"
              >
                Movie/TV Tracker
              </a>
              .<br></br>
              <br></br>
              Why is it important to persevere when things get hard? <br></br>
              Because of{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/watch?v=k6C8SX0mWP0"
              >
                The Tales that Mattered
              </a>
              .<br></br>
              <br></br>
              <details>
                <summary>Notes to myself:</summary>
                <ol className="list-decimal ml-12">
                  <li>
                    There's always{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://youtu.be/xaTmv67WpRM?t=599"
                    >
                      a gap {" "}
                    </a>
                    between a stimulus and your response.
                  </li>
                  <li>
                    Your{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.amazon.com/Mans-Search-Meaning-Viktor-Frankl/dp/080701429X"
                    >
                      last human freedom {" "}
                    </a>
                    is to choose your attitude in any given set of
                    circumstances.
                  </li>
                  <li>Don't lose the power to see the good in people.</li>
                  <li>
                    You just can't beat the person who never gives up. - Babe
                    Ruth
                  </li>
                  <li>
                    The secret is{" "}
                    <span className="underline font-bold">Grit</span>.
                  </li>
                </ol>
              </details>
            </div>

            <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-500 dark:text-neutral-400">
              <li>
                <a
                  className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://twitter.com/ananthp_"
                >
                  <p className="h-7">➚follow me on twitter</p>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://linkedin.com/in/ananth-preetham"
                >
                  <p className="h-7">➚connect with me on linkedin</p>
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a
                  className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.umass.edu/gateway/article/2022-senior-series-ananth-and-sid-preetham"
                >
                  <p className="h-7">
                    ➚a university of massachusetts artice about me and my
                    cofounder/twin, Sid
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <footer className="py-24 px-4 text-neutral-600">
          <div className="max-w-xl mx-auto">
            <blockquote className="text-xs leading-relaxed border-l-[0.5px] border-gray-700 pl-4">
              <p className="mb-2">
                You can't connect the dots looking forward; you can only connect
                them looking backwards. So you have to trust that the dots will
                somehow connect in your future.
              </p>
              <p>
                You have to trust in something - your gut, destiny, life, karma,
                whatever.
              </p>
            </blockquote>
            <cite className="block mt-6 text-xs">- Steve Jobs</cite>
            <div className="text-xs mt-2">
              Inspired by{" "}
              <a
                href="https://leerob.io"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-neutral"
              >
                Lee Robinson's website
              </a>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}
