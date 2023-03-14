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
            <p className="my-5 max-w-[460px] text-neutral-800 dark:text-neutral-200">
              Hey - I'm Ananth. I'm the Co-founder of Matherium where we're
              building AI avatars to help businesses. I love to build things by
              hacking other things together. <br></br><br></br>
              I like to write sometimes and I
              love good movies and TV shows. Watching Mythic Quest on Apple TV+ right now.
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
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
