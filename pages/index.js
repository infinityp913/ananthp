import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Libre_Baskerville } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/Card";
import { Chevron } from "@/components/Chevron";
import { formatDate } from "@/lib/formatDate";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const toggleClass =
  "flex items-center gap-2.5 min-h-[44px] text-left text-neutral-300 hover:text-neutral-100 transition-colors";

export default function Home({ latestNotes = [] }) {
  const [showVideo, setShowVideo] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  return (
    <>
      <Head>
        <title>{"Hi, I'm Ananth."}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Ananth Preetham: founder, ML engineer, professional rabbit-holer. Building Pomelo."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="w-screen m-auto pb-16 px-6 sm:px-20 lg:px-0 max-w-2xl text-neutral-200">
        <div className="flex w-full">
          <div className="mt-[5rem] w-full">
            <Navbar />
            <Image
              alt="Ananth Preetham"
              src="/memoji.png"
              width={88}
              height={88}
              priority
              className="-ml-1"
            />
            <h1
              className={`mt-3 font-semibold text-2xl sm:text-3xl text-white ${libreBaskerville.className}`}
            >
              Hi, I&apos;m Ananth.
            </h1>
            <p className="mt-2 text-lg text-neutral-300">
              I&apos;m a founder, builder and ML engineer.
            </p>

            {latestNotes.length > 0 && (
              <div className="mt-12">
                <div className="flex items-baseline justify-between mb-4">
                  <h2 className="text-neutral-400 text-xs uppercase tracking-widest">
                    Latest notes
                  </h2>
                  <Link
                    href="/notes"
                    className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
                  >
                    All notes →
                  </Link>
                </div>
                <ul className="list-none grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {latestNotes.map((note) => (
                    <li key={note.slug}>
                      <Card
                        as={Link}
                        href={`/notes/${note.slug}`}
                        interactive
                        className="h-full"
                      >
                        <span className="block font-medium text-neutral-100">
                          {note.title}
                        </span>
                        {note.date && (
                          <time
                            dateTime={note.date}
                            className="block text-sm text-neutral-500 mt-1"
                          >
                            {formatDate(note.date)}
                          </time>
                        )}
                      </Card>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-12 max-w-[36rem] space-y-5 leading-7 text-neutral-300">
              <p>
                Currently building{" "}
                <a
                  href="https://learnpomelo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pomelo
                </a>
                , a platform to learn anything.
              </p>
              <div>
                <p>
                  I&apos;ve been building stuff with my twin brother,{" "}
                  <a
                    href="https://sidpreetham.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sid
                  </a>
                  , since we were 11. We built:
                </p>
                <ul className="mt-3 list-disc pl-5 space-y-2 marker:text-neutral-600">
                  <li>A math teaching website in high school</li>
                  <li>A VR headset for education</li>
                  <li>
                    AI agents you video call with (we called them Interactive
                    Deepfakes, or &quot;IDFs&quot;, in 2022; no wonder the name
                    didn&apos;t stick)
                  </li>
                  <li>AI voice agents for customer service</li>
                  <li>
                    Voice agents for F1 visa interview prep (
                    <a
                      href="https://matherium.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Matherium
                    </a>
                    ) that grew to{" "}
                    <strong className="text-neutral-100 font-medium">
                      7,000 users
                    </strong>
                    . We knew we had built something people wanted when
                    checkout broke and students tried multiple cards rather
                    than give up.
                  </li>
                  <li>
                    An end-to-end automated operating system for a Roman
                    archaeology project (
                    <a
                      href="https://github.com/infinityp913/tarp-field"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TARP Field
                    </a>
                    ,{" "}
                    <a
                      href="https://github.com/infinityp913/tarp-lab"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      TARP Lab
                    </a>
                    ). After two summers digging at a
                    Roman-Carthaginian site in Sardinia, we automated the
                    boring part: pipelines that turn dig photos into{" "}
                    <strong className="text-neutral-100 font-medium">
                      3D models of stratigraphic units
                    </strong>
                    .
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-8 -ml-[12px] text-neutral-400">
              <a
                className="hover:text-neutral-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg"
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
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M4.98 3.5a2.5 2.5 0 1 1-.01 5 2.5 2.5 0 0 1 .01-5zM3 8.75h4v12.25H3V8.75zm7.5 0H14v1.67h.05c.49-.93 1.69-1.92 3.47-1.92 3.71 0 4.39 2.44 4.39 5.62V21h-4v-5.4c0-1.29-.03-2.96-1.8-2.96-1.8 0-2.08 1.4-2.08 2.86V21h-4V8.75z" />
                </svg>
              </a>
              <a
                className="hover:text-neutral-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg"
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
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M12 .5A11.5 11.5 0 0 0 8.37 23c.58.1.79-.25.79-.56v-2.01c-3.22.7-3.9-1.38-3.9-1.38-.53-1.35-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.79 2.72 1.27 3.39.97.1-.75.41-1.27.75-1.56-2.57-.29-5.27-1.28-5.27-5.72 0-1.27.46-2.3 1.2-3.11-.12-.3-.52-1.52.11-3.18 0 0 .98-.31 3.2 1.19a11.07 11.07 0 0 1 5.82 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.66.23 2.88.11 3.18.75.81 1.2 1.84 1.2 3.11 0 4.45-2.7 5.42-5.28 5.71.42.36.8 1.08.8 2.18v3.23c0 .31.2.66.8.56A11.5 11.5 0 0 0 12 .5z" />
                </svg>
              </a>
              <a
                className="hover:text-neutral-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg"
                rel="noopener noreferrer"
                target="_blank"
                href="https://x.com/ananthp_"
                aria-label="X"
                title="X"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                </svg>
              </a>
            </div>

            <div className="mt-6 max-w-[36rem]">
              <button
                type="button"
                className={toggleClass}
                aria-expanded={showVideo}
                onClick={() => setShowVideo(!showVideo)}
              >
                <Chevron open={showVideo} className="text-neutral-500" />
                Persevering when things get hard.
              </button>
              {showVideo && (
                <div className="mt-2 mb-4 overflow-hidden rounded-xl border border-neutral-800">
                  <iframe
                    src="https://www.youtube.com/embed/A_u9Hc0Yg1o"
                    title="Persevering when things get hard"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="block w-full aspect-video border-0"
                  />
                </div>
              )}
              <button
                type="button"
                className={toggleClass}
                aria-expanded={showNotes}
                onClick={() => setShowNotes(!showNotes)}
              >
                <Chevron open={showNotes} className="text-neutral-500" />
                Notes to myself:
              </button>
              {showNotes && (
                <ol className="list-decimal pl-11 mt-1 space-y-2 leading-7 text-neutral-300 marker:text-neutral-500">
                  <li>
                    There&apos;s always{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://youtu.be/xaTmv67WpRM?t=599"
                    >
                      a gap
                    </a>{" "}
                    between a stimulus and your response.
                  </li>
                  <li>
                    Your{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.amazon.com/Mans-Search-Meaning-Viktor-Frankl/dp/080701429X"
                    >
                      last human freedom
                    </a>{" "}
                    is to choose your attitude in any given set of
                    circumstances.
                  </li>
                  <li>Don&apos;t lose the power to see the good in people.</li>
                  <li>
                    You just can&apos;t beat the person who never gives up. -
                    Babe Ruth
                  </li>
                  <li>
                    The secret is{" "}
                    <strong className="text-neutral-100 font-semibold">
                      Grit
                    </strong>
                    .
                  </li>
                </ol>
              )}
            </div>

            <footer className="mt-16 py-12 border-t border-neutral-800 text-neutral-500">
              <blockquote className="max-w-[36rem] text-sm leading-relaxed border-l border-neutral-700 pl-4">
                <p className="mb-2">
                  You can&apos;t connect the dots looking forward; you can only
                  connect them looking backwards. So you have to trust that the
                  dots will somehow connect in your future.
                </p>
                <p>
                  You have to trust in something - your gut, destiny, life,
                  karma, whatever.
                </p>
              </blockquote>
              <cite className="block mt-4 pl-4 text-sm not-italic">
                Steve Jobs
              </cite>
              <p className="text-sm mt-8">
                Inspired by{" "}
                <a
                  href="https://leerob.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-neutral-700 underline-offset-[3px] hover:text-neutral-200 hover:decoration-neutral-400 transition-colors"
                >
                  Lee Robinson&apos;s page
                </a>
              </p>
            </footer>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const { getAllNotes, toSummary } = await import("@/lib/notes");
  return { props: { latestNotes: getAllNotes().slice(0, 4).map(toSummary) } };
}
