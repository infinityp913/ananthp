import Head from "next/head";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>ananthp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="text-xs">
        <div className="flex h-screen">
          <div className="m-auto mt-[8rem]">
            <div className="flex items-start md:items-center my-2 flex-col md:flex-row">
              <Image
                alt="Ananth Preetham"
                // className="rounded-full grayscale"
                src="/prof-pic.png"
                width={150}
                height={150}
                priority
              />
            </div>
            <h1 className="font-semibold text-xl font-serif text-white">
              Ananth Preetham
            </h1>
            <p className="my-5 sm:max-w-[460px] max-w-[300px] text-neutral-800 dark:text-neutral-200">
              Hey - I'm Ananth (Uh-Nun-t). I'm the co-founder of{" "}
              <a href="https://matherium.com">Matherium</a> where we're building
              AI call agents to help businesses. I love to hack things together
              to build better things. <br></br>
              <br></br>I like to write sometimes and I love good movies and TV
              shows. Watching Mr and Mrs Smith on Prime Video right now. Dune
              2's up next.
              <br></br>
              <br></br>
              Why is it important to persevere when things get hard? <br></br>
              Because of{" "}
              <a href="https://www.youtube.com/watch?v=k6C8SX0mWP0">
                The Tales that Mattered
              </a>
              .<br></br>
              <br></br>
              <details>
                <summary>Notes to myself:</summary>
                <ol>
                  <li>
                    <a href="https://youtu.be/xaTmv67WpRM?t=599">
                      1. There's always a gap between a stimulus and your response.
                    </a>
                  </li>
                  <li>
                    <a href="https://www.amazon.com/Mans-Search-Meaning-Viktor-Frankl/dp/080701429X">
                      2. Your last human freedom is to choose your attitude in any
                      given set of circumstances.
                    </a>
                  </li>
                  <li>3. Don't lose the power to see the good in people.</li>
                  <li>
                    4. You just can't beat the person who never gives up. - Babe
                    Ruth
                  </li>
                </ol>
              </details>
            </p>

            <p className="my-5 max-w-[600px] text-neutral-800 dark:text-neutral-200">
              {/* {bio()} */}
            </p>
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
      </section>
    </>
  );
}
