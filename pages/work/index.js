import Head from "next/head";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Libre_Baskerville } from "next/font/google";
import Image from "next/image";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export default function WorkPage() {
  return (
    <>
      <Head>
        <title>Work | ananthp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="w-screen m-auto pb-16 px-20 lg:px-0 flex items-center justify-center md:flex-row max-w-2xl text-neutral-200">
        <div className="flex">
          <div className="mt-[5rem]">
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
              className={`font-semibold text-2xl text-white mb-5 ${libreBaskerville}`}
            >
              My work
            </h1>
            <p>Entrepreneur, ML and Software Engineer.</p>
            <p>Working towards making financial freedom accessible to as many people as possible.</p>
            <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
            <h2 className="font-medium text-xl mb-1 tracking-tighter">
              Matherium
            </h2>
            <p className="my-6 text-neutral-600 dark:text-neutral-400 text-sm">
              Co-founder & ML Engineer, Feb 2022 — Present
            </p>
            <ul className="leading-relaxed list-disc">
              <li>
                At{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://matherium.com"
                >
                  Matherium
                </a>
                , I managed a team of 3 to develop an AI SaaS startup developing
                AI Call Agents for businesses.
              </li>
              <li>
                Engineered integrations with popular LLMs and tuned C++ based
                speed-optimized Speech Neural nets, reducing response time by
                25%.
              </li>
              <li>
                Led code reviews, new system architecture design sessions, code
                testing and source control management.
              </li>
              <li>
                Designed and Implemented a multi-threaded, concurrent WebRTC
                streaming back-end for P2P communication with Go (Golang),
                Ffmpeg and MediaStreams for real-time stream processing,
                reducing latency by 65%.
              </li>
              <li>
                Designed and Shipped a Full Stack App using Next.js, Tailwind
                CSS, React, Flask, Node, Nginx.
              </li>
              <li>
                Set up networking, logging and monitoring systems on Linux, Bash
                (Ubuntu and Arch Linux)
              </li>
            </ul>
            <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
            <h2 className="font-medium text-xl mb-1 tracking-tighter">
              Nike
            </h2>
            <p className="my-6 text-neutral-600 dark:text-neutral-400 text-sm">
              ML Engineer, Oct 2024 — Present
            </p>
            <ul className="leading-relaxed list-disc">
              <li>
                At{" "}
                Nike, I am currently building a GraphRAG-powered AI assistant trained on Nike's macroeconomic and competitive landscape using government and media documents, leveraging LlamaIndex, AWS' GraphRAG-toolkit, and LibreChat.
              </li>
              <li>
                Enhanced AI assistant accountability by implementing source attribution and statement tracking in the UI, ensuring transparency and traceability of information.
              </li>
              <li>
                Deployed Generative AI solutions to help discover Nike products in media assets using object detection, segmentation and vector search via Databricks and AWS services such as SageMaker.
              </li>
              <li>
                Leveraged Claude 3.5 Sonnet to generate descriptions and metadata tags for Nike products in marketing assets.
              </li>
            </ul>
            <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
            <h2 className="font-medium text-xl mb-1 tracking-tighter">
              Pompeii Artistic Landscape Project
            </h2>
            <p className="my-6 text-neutral-600 dark:text-neutral-400 text-sm">
              Lead Software Engineer, Sep 2021 — Oct 2022
            </p>
            <ul className="leading-relaxed list-disc">
              <li>
                At{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://main--palp-art.netlify.app/"
                >
                  PALP
                </a>
                , I managed a technical team to develop NLP for data extraction
                to support a $250M Getty-funded Pompeii Modeling project.
              </li>
              <li>
                Built a Data Validation pipeline to verify 100K+ complex data
                records with varying structure.
              </li>
              <li>
                Shipped a Gatsby + React + Node App to encapsulate the complex
                project in a UX friendly product.
              </li>
              <li>
                Worked collaboratively with stakeholders to resolve technical
                roadblocks.
              </li>
            </ul>
            <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
            <h2 className="font-medium text-xl mb-1 tracking-tighter">Nike</h2>
            <p className="my-6 text-neutral-600 dark:text-neutral-400 text-sm">
              Machine Learning Engineer, Jun 2021 — Aug 2021
            </p>
            <ul className="leading-relaxed list-disc">
              <li>
                At{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://nike.com"
                >
                  Nike
                </a>
                , I designed and Implemented an ML pipeline to automate the
                creation of 50K+ product names/year on Nike.com
              </li>
              <li>
                Developed a Seq2Seq Encoder-Decoder Model, with an Attention
                head using BERT + Tensorflow, Keras libraries.
              </li>
              <li>
                Presented findings and recommendations to stakeholders through
                detailed reports and visualizations, driving data-driven
                decision making.
              </li>
            </ul>

            <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
            <h2 className="font-medium text-xl mb-1 tracking-tighter">
              Fidelity Investments
            </h2>
            <p className="my-6 text-neutral-600 dark:text-neutral-400 text-sm">
              Software Engineer (FUll Stack), Jun 2020 — Aug 2020
            </p>
            <ul className="leading-relaxed list-disc">
              <li>
                At{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://fidelity.com"
                >
                  Fidelity Investments
                </a>
                , I accelerated Fidelity's transition to a new Cloud platform by
                resolving performance bottlenecks through advanced CICD
                pipelines; improved deployment efficiency by 40% and reduced
                downtime by 25%.
              </li>
              <li>
                Launched team efforts to implement SSO in the migrated Cloud
                platform for 3 core web apps via Agile.
              </li>
              <li>
                Led every stage of a Software Development Life Cycle for web
                features including planning, implementing, testing, reviewing,
                deploying and maintaining.
              </li>
              <li>
                Participated in agile development methodologies, code reviews,
                source control management, build processes, testing, and
                actively engaging in daily stand-up meetings and sprint planning
                sessions.
              </li>
            </ul>

            <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
            <h2 className="font-medium text-xl mb-1 tracking-tighter">
              Matherium VR
            </h2>
            <p className="my-6 text-neutral-600 dark:text-neutral-400 text-sm">
              Co-founder and Software Engineer, Sep 2019 — May 2021
            </p>
            <ul className="leading-relaxed list-disc">
              <li>
                Built a prototype for a VR headset with a Jetson Nano, lenses
                and Unreal Engine.
              </li>
              <li>
                Developed Computer Vision neural nets for embedded systems
                (TFLite) to use hands to control the interface.
              </li>
              <li>
                Implemented a Whiteboard app with the ability to draw +
                Educational content.
              </li>
            </ul>

            <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
            <h2 className="font-medium text-xl mb-1 tracking-tighter">
              Computer Science @ University of Massachusetts Amherst
            </h2>
            <p className="my-6 text-neutral-600 dark:text-neutral-400 text-sm">
              Teaching Assistant, Jan 2020 — May 2020
            </p>
            <ul className="leading-relaxed list-disc">
              <li>
                Led discussion sections for 120+ CS sophomores and juniors the
                fundamentals of good programming methodologies including
                Memoization and Dynamic Programming.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
