import Head from "next/head";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Libre_Baskerville } from "next/font/google";
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
      <section className="w-screen m-auto pb-16 px-6 sm:px-20 lg:px-0 flex items-center justify-center md:flex-row max-w-2xl text-neutral-200">
        <div className="flex">
          <div className="mt-[5rem]">
            <Navbar></Navbar>
            <h1
              className={`font-semibold text-2xl text-white mb-5 ${libreBaskerville.className}`}
            >
              My work
            </h1>
            <p className="text-neutral-500 text-sm mb-10">
              Entrepreneur, ML and Software Engineer.
            </p>
            <h2 className="font-medium text-xl mb-1 tracking-tighter">
              Stealth
            </h2>
            <p className="my-6 text-neutral-400 text-sm">
              Co-founder, Feb 2026 — Present
            </p>
            <hr className="my-6 border-neutral-800" />
            <h2 className="font-medium text-xl mb-1 tracking-tighter">
              Matherium
            </h2>
            <p className="my-6 text-neutral-400 text-sm">
              Co-Founder, May 2025 — Feb 2026
            </p>
            <ul className="leading-relaxed list-disc">
              <li>
                Built an AI mock F1 visa interviewer using voice AI for
                prospective international students coming to the US.
              </li>
              <li>1000+ users and 4000+ interview calls made.</li>
              <li>
                When we built AI voice agents for F1 mock interviews, our
                payments were broken for people in India and students would try
                paying with multiple cards (from their parents) to pay for our
                tool — we knew we had product market fit then.
              </li>
              <li>
                Set up networking and databases. Trained neural networks and ran
                inference tests.
              </li>
              <li>Designed and built our Next.js app and landing page.</li>
            </ul>
            <hr className="my-6 border-neutral-800" />
            <h2 className="font-medium text-xl mb-1 tracking-tighter">Nike</h2>
            <p className="my-6 text-neutral-400 text-sm">
              ML Engineer, Oct 2024 — Present
            </p>
            <ul className="leading-relaxed list-disc">
              <li>
                Driving data federation across platforms for a single-truth KPI
                reporting service.
              </li>
              <li>
                Worked on a GraphRAG agent to enable analysts to query market
                and competitive intelligence questions and get source-cited
                answers from frequently ingested, approved documents and
                sources. Used LlamaIndex and AWS GraphRAG toolkit.
              </li>
              <li>
                Worked on Computer Vision ML infrastructure using AWS SageMaker,
                Docker, Databricks, and MLflow.
              </li>
              <li>
                Improved product detection algorithm accuracy by 10% through
                systematic MLflow experimentation.
              </li>
            </ul>
            <hr className="my-6 border-neutral-800" />
            <h2 className="font-medium text-xl mb-1 tracking-tighter">
              Tharros Archaeological Research Project
            </h2>
            <p className="my-6 text-neutral-400 text-sm">
              Software Engineer (Photogrammetry and Volumetrics), Jun - Jul 2025
            </p>
            <ul className="leading-relaxed list-disc">
              <li>
                Automated manual photogrammetry and volumetric visualization
                processes of 150+ Roman/Punic excavation trenches in Sardinia,
                Italy.
              </li>
              <li>
                Built an end-to-end automated workflow from photographs from
                trenches to 3D models generated using CloudCompare, Blender, and
                Metashape.
              </li>
              <li>Increased turnaround time by 70%+.</li>
              <li>Enabled parallelization of processes.</li>
            </ul>
            <hr className="my-6 border-neutral-800" />
            <h2 className="font-medium text-xl mb-1 tracking-tighter">
              AI Voice Agents for Customer Service
            </h2>
            <p className="my-6 text-neutral-400 text-sm">
              Co-Founder, Jan 2023 — May 2024
            </p>
            <ul className="leading-relaxed list-disc">
              <li>
                Built call agents for customer service by hacking up a Go server
                to orchestrate MediaStreams between Whisper (STT), Vosk (ASR),
                TransformerTTS (TTS), Haystack and a basic Language Model.
              </li>
            </ul>
            <hr className="my-6 border-neutral-800" />
            <h2 className="font-medium text-xl mb-1 tracking-tighter">
              Interactive AI Avatars for Customer Service
            </h2>
            <p className="my-6 text-neutral-400 text-sm">
              Co-Founder, Feb 2022 — Jan 2023
            </p>
            <ul className="leading-relaxed list-disc">
              <li>
                Designed and trained a TTS model. Used Whisper for STT. Helped
                design and train the Deepfake GAN model for AI avatars. Created
                an early MVP to demonstrate the idea to customers.
              </li>
            </ul>
            <hr className="my-6 border-neutral-800" />
            <h2 className="font-medium text-xl mb-1 tracking-tighter">
              Pompeii Artistic Landscape Project
            </h2>
            <p className="my-6 text-neutral-400 text-sm">
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
            <hr className="my-6 border-neutral-800" />
            <h2 className="font-medium text-xl mb-1 tracking-tighter">Nike</h2>
            <p className="my-6 text-neutral-400 text-sm">
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

            <hr className="my-6 border-neutral-800" />
            <h2 className="font-medium text-xl mb-1 tracking-tighter">
              Fidelity Investments
            </h2>
            <p className="my-6 text-neutral-400 text-sm">
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
                , I accelerated Fidelity&apos;s transition to a new Cloud platform by
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

            <hr className="my-6 border-neutral-800" />
            <h2 className="font-medium text-xl mb-1 tracking-tighter">
              Matherium VR
            </h2>
            <p className="my-6 text-neutral-400 text-sm">
              Co-founder and Software Engineer, Sep 2019 — May 2021
            </p>
            <ul className="leading-relaxed list-disc">
              <li>
                Built a prototype for a VR headset with a Jetson Nano, lenses,
                Unreal Engine and TensorRT.
              </li>
              <li>
                Developed Computer Vision neural nets for embedded systems
                (TFLite/LiteRT) to use hands to control the interface.
              </li>
              <li>
                Implemented a Whiteboard app with the ability to draw +
                Educational content.
              </li>
            </ul>

            <hr className="my-6 border-neutral-800" />
            <h2 className="font-medium text-xl mb-1 tracking-tighter">
              Computer Science @ University of Massachusetts Amherst
            </h2>
            <p className="my-6 text-neutral-400 text-sm">
              Teaching Assistant, Jan 2020 — May 2020
            </p>
            <ul className="leading-relaxed list-disc">
              <li>
                Led discussion sections for 120+ CS sophomores and juniors the
                fundamentals of good programming methodologies including
                Memoization and Dynamic Programming.
              </li>
            </ul>

            <hr className="my-6 border-neutral-800" />
            <h2 className="font-medium text-xl mb-1 tracking-tighter">
              Pompeii Artistic Landscape Project
            </h2>
            <p className="my-6 text-neutral-400 text-sm">
              NLP Research Assistant, Feb 2019 — Sep 2021
            </p>
            <ul className="leading-relaxed list-disc">
              <li>
                Developed NLP algorithms to extract from unstructured data to
                contribute to a database for the digital mapping of Pompeii for
                a $250M Getty-funded Project —{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://palp.p-lod.umasscreate.net/"
                >
                  Pompeii Artistic Landscape Project
                </a>
                .
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
