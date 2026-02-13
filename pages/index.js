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
              Hey - I'm Ananth (Uh-Nun-t). I'm the co-founder @{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://trychalkboard.com"
              >
                Chalkboard
              </a>
              . We're building the AI OS for enterprise training.
              <br></br>
              <br></br>I built voice agents for F1 visa interviews, customer
              service and more @{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://matherium.org"
              >
                Matherium
              </a>
              . <br></br>
              <br></br> I do ML and software at Nike.<br></br>
              <br></br>I like to write sometimes and I love good movies and TV
              shows. Check out my {" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://letterboxd.com/infinityp913/"
                className="underline"
              >
                letterboxd
              </a>{" "}
              .
              <br></br>I love to hack things together to build better things.{" "}
              <br></br>
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
                <summary className="cursor-pointer">Notes to myself:</summary>
                <ol className="list-decimal ml-12">
                  <li>
                    There's always{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://youtu.be/xaTmv67WpRM?t=599"
                    >
                      a gap{" "}
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
                      last human freedom{" "}
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

            <div className="flex items-center mt-8 space-x-5 text-neutral-500 dark:text-neutral-400">
              <a
                className="hover:text-neutral-200 transition-all"
                rel="noopener noreferrer"
                target="_blank"
                href="https://twitter.com/ananthp_"
                aria-label="X"
                title="X"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M18.901 2H22l-7.348 8.394L23.5 22h-6.78l-5.3-6.905L5.6 22H2.5l7.86-8.98L.5 2h6.95l4.8 6.31L18.901 2zM16.8 19.2h1.9L7.2 4.7H5.1l11.7 14.5z" />
                </svg>
              </a>
              <a
                className="hover:text-neutral-200 transition-all"
                rel="noopener noreferrer"
                target="_blank"
                href="https://linkedin.com/in/ananth-preetham"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M4.98 3.5a2.5 2.5 0 1 1-.01 5 2.5 2.5 0 0 1 .01-5zM3 8.75h4v12.25H3V8.75zm7.5 0H14v1.67h.05c.49-.93 1.69-1.92 3.47-1.92 3.71 0 4.39 2.44 4.39 5.62V21h-4v-5.4c0-1.29-.03-2.96-1.8-2.96-1.8 0-2.08 1.4-2.08 2.86V21h-4V8.75z" />
                </svg>
              </a>
              <a
                className="hover:text-neutral-200 transition-all"
                rel="noopener noreferrer"
                target="_blank"
                href="https://github.com/infinityp913"
                aria-label="GitHub"
                title="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M12 .5A11.5 11.5 0 0 0 8.37 23c.58.1.79-.25.79-.56v-2.01c-3.22.7-3.9-1.38-3.9-1.38-.53-1.35-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.79 2.72 1.27 3.39.97.1-.75.41-1.27.75-1.56-2.57-.29-5.27-1.28-5.27-5.72 0-1.27.46-2.3 1.2-3.11-.12-.3-.52-1.52.11-3.18 0 0 .98-.31 3.2 1.19a11.07 11.07 0 0 1 5.82 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.66.23 2.88.11 3.18.75.81 1.2 1.84 1.2 3.11 0 4.45-2.7 5.42-5.28 5.71.42.36.8 1.08.8 2.18v3.23c0 .31.2.66.8.56A11.5 11.5 0 0 0 12 .5z" />
                </svg>
              </a>
            </div>
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
