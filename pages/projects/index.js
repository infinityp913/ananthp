import Head from "next/head";
import { Navbar } from "@/components/Navbar";
import { Libre_Baskerville } from "next/font/google";
import { useEffect, useRef } from "react";
import { groupByYear } from "@/lib/groupByYear";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const projects = [
  {
    title: "HabitTracker",
    year: 2026,
    description:
      "A minimal iPhone habit tracker with a home screen widget. Track one habit, see your streak — that's it. Built with Swift and WidgetKit: a small widget shows the streak count, a medium widget has interactive check/X buttons via AppIntents. Daily notifications with inline actions, a configurable start date to preserve existing streaks, and all data stored in a shared App Group so the widget and app stay in sync.",
    tech: ["Swift", "SwiftUI", "WidgetKit", "AppIntents", "iOS 17"],
    link: "https://github.com/infinityp913/habit-tracker",
  },
  {
    title: "Personal Website",
    year: 2023,
    description:
      "This site — a personal portfolio built with Next.js 13 (Pages Router), React 18, and Tailwind CSS. Deployed on Vercel. Inspired by Lee Robinson's website.",
    tech: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    link: "https://github.com/infinityp913/ananthp",
  },
  {
    title: "I-JEPA",
    year: 2026,
    description:
      "A from-scratch PyTorch implementation of I-JEPA — Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture (Assran et al., Meta AI 2023). Implements a ViT backbone with a context encoder, EMA target encoder, and a predictor that learns entirely in representation space — no contrastive loss or pixel reconstruction required.",
    tech: ["PyTorch", "Python", "ViT", "Self-Supervised Learning"],
    link: "https://github.com/infinityp913/i-jepa",
  },
  {
    title: "CloudCompare Automation for Archaeological Volumetrics",
    year: 2025,
    description:
      "A script to automate volumetric generation for excavated stratigraphic units (SUs) using CloudCompare processes, producing 3D objects viewable from all angles for post-excavation analysis and record keeping. Part of the Tharros Archaeological Research Project (TARP), directed by Dr. Eric Poehler and Dr. Steven Ellis at the University of Cincinnati. Output is archived on A.I.R., a visual archival platform for archaeological projects built by Paola Derudas at Lund University.",
    tech: ["Python", "CloudCompare", "3D Volumetrics", "Archaeology"],
    link: "https://github.com/garygao333/cloudcomparescript",
  },
  {
    title: "Real-Time WebRTC Audio Routing Server for Voice Agents",
    year: 2023,
    description:
      "A concurrent Go server that brokers real-time WebRTC connections between browser clients and on-demand server clients, routing audio streams through Speech-to-Text. The backbone infrastructure for Ria Voice.",
    tech: ["Go", "WebRTC", "Speech-to-Text", "MediaStreams"],
    link: "https://github.com/infinityp913/voice-agent-webrtc-router",
  },
  {
    title: "Ria Voice",
    year: 2023,
    description:
      "Voice agents for customer service — hacked together Vosk for ASR, a custom TTS pipeline (Tacotron / WaveGlow / HiFi-GAN) and Whisper for STT, all orchestrated by a concurrent Go server across multiple MediaStreams. Integrated GPT and tuned Whisper.cpp, cutting response time by 25%.",
    tech: [
      "Go",
      "WebRTC",
      "Whisper",
      "Next.js",
      "React",
      "Flask",
      "Nginx",
      "TTS",
      "LLM",
    ],
    link: "https://github.com/a13m-matherium/ria-voice-website",
  },
  {
    title: "AI Avatars for Customer Service",
    year: 2022,
    description:
      "Interactive AI avatars whose faces move in sync with a voice agent's audio — think voice agent + a deepfake video model driven by speech. Designed and trained a custom TTS model, co-designed the lip-sync GAN. Pivoted to voice-only agents based on user feedback.",
    tech: ["GAN", "TTS", "Whisper", "Python", "Deepfake"],
  },
  {
    title: "Pompeii Artistic Landscape Project",
    year: 2022,
    description:
      "A map-based exploration of the artistic and geographical history of Pompeii. Built in collaboration with Dr. Eric Poehler (UMass Amherst) and Sebastian Heath (NYU) to visualize PALP's archaeological data.",
    tech: ["Gatsby", "React", "Node.js", "NLP"],
    link: "https://palp-art.netlify.app/start/",
  },
  {
    title: "GPU Server",
    year: 2021,
    description:
      "A custom liquid-cooled compute server built for ML workflows: RTX 3070 (8GB vRAM), 128GB RAM, Ryzen 5 CPU. Hand-built the cooling loop with PEG hard tubes bent over candle heat — a $4K build during senior year finals that paid back in cloud compute savings.",
    tech: ["Custom Hardware", "NVIDIA RTX 3070", "Liquid Cooling", "CUDA"],
  },
  {
    title: "DonateIt",
    year: 2020,
    description:
      "A charitable donation platform that contextualizes contributions using cost-of-living data across countries, helping donors understand the real-world impact of their money.",
    tech: ["HTML5", "CSS", "JavaScript", "jQuery", "SCSS"],
    link: "https://devpost.com/software/donateit-4il5tg",
  },
  {
    title: "Project Iris",
    year: 2020,
    description:
      "An application that identifies objects in the real world through your camera and translates their names into your language — bridging the physical and linguistic gap for language learners.",
    tech: ["Python", "Computer Vision", "Object Detection", "Translation"],
    link: "https://github.com/infinityp913/Project-Iris",
  },
  {
    title: "Readable",
    year: 2020,
    description:
      "A web app that uses your camera to capture hard-to-read text and reads it back to you aloud. Designed to be simple — ideal for the elderly, visually impaired, and those with reading difficulties.",
    tech: ["JavaScript", "OCR", "Text-to-Speech", "Camera API"],
    link: "https://github.com/infinityp913/Readable",
  },
  {
    title: "TampAlert!",
    year: 2019,
    description:
      "A mobile app connecting users facing period emergencies with nearby community members willing to supply sanitary products — peer-to-peer, like a ride-share for menstrual supplies.",
    tech: ["Android Studio", "Firebase", "Google Maps API", "Java"],
    link: "https://devpost.com/software/tampalert",
  },
  {
    title: "Trashcan Finder",
    year: 2019,
    description:
      "Helps users locate nearby trashcans via real-time mapping, and enables organizations to identify areas lacking waste disposal infrastructure.",
    tech: ["Android Studio", "Firebase", "Google Maps API", "Java", "GCP"],
    link: "https://devpost.com/software/trashcan-finder",
  },
  {
    title: "VR Headset for Education",
    year: 2019,
    description:
      "A prototype educational VR headset built from a Jetson Nano, Google Cardboard, Unreal Engine and TensorRT. Developed hand-tracking neural nets for embedded inference (TFLite/LiteRT) to control the interface with hands. Built a whiteboard app with finger-drawing and educational content.",
    tech: ["Jetson Nano", "Unreal Engine", "TFLite", "TensorRT", "Computer Vision", "C++"],
  },
];

function linkLabel(href) {
  if (!href) return 'Open ↗';
  if (href.includes('github.com')) return 'GitHub ↗';
  if (href.includes('devpost.com')) return 'Devpost ↗';
  return 'Open ↗';
}

const yearGroups = groupByYear(projects);
const flatProjects = yearGroups.flatMap((g) => g.projects);

export default function ProjectsPage() {
  const cardRefs = useRef([]);

  useEffect(() => {
    document.body.classList.add("js-animations");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      document.body.classList.remove("js-animations");
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Projects | ananthp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Hackathon projects and side builds by Ananth Preetham."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="w-screen m-auto pb-16 px-6 sm:px-20 lg:px-0 flex items-center justify-center md:flex-row max-w-2xl text-neutral-200">
        <div className="flex w-full">
          <div className="mt-[5rem] w-full">
            <Navbar />
            <h1
              className={`font-semibold text-2xl text-white mb-2 ${libreBaskerville.className}`}
            >
              Projects
            </h1>
            <p className="text-neutral-500 text-sm mb-10">
              Hackathon builds and side projects. Many of these were built in
              collaboration with friends and family — most often with my twin
              brother,{" "}
              <a
                href="https://www.linkedin.com/in/sid-preetham-245768166/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-neutral-300 transition-colors"
              >
                Sid
              </a>
              .
            </p>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical spine */}
              <div className="absolute top-2 bottom-0 w-px bg-neutral-800 left-12 sm:left-16" />

              {yearGroups.map(({ year, projects: yearProjects }) => (
                <div key={year} className="mb-10 sm:mb-14">
                  {/* Year marker */}
                  <div className="flex items-center mb-5 sm:mb-7">
                    <span className="w-12 sm:w-16 flex-shrink-0 text-right pr-4 text-neutral-600 text-xs tracking-widest">
                      {year}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-neutral-700 flex-shrink-0 z-10 relative -ml-[3.5px]" />
                  </div>

                  {/* Projects */}
                  <div className="space-y-8 sm:space-y-10">
                    {yearProjects.map((project) => {
                      const flatIdx = flatProjects.indexOf(project);
                      return (
                        <div key={project.title} className="flex items-start">
                          {/* Spacer matching year column width */}
                          <div className="w-12 sm:w-16 flex-shrink-0" />
                          {/* Dot on the spine */}
                          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-neutral-800 flex-shrink-0 z-10 relative -ml-[2.5px]" />
                          {/* Card */}
                          <div
                            ref={(el) => {
                              cardRefs.current[flatIdx] = el;
                            }}
                            className="ml-4 sm:ml-6 flex-1 min-w-0 project-card"
                          >
                            <div className="mb-1">
                              <span className="font-medium text-neutral-200">
                                {project.title}
                              </span>
                              {project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block text-xs text-neutral-500 hover:text-neutral-300 transition-colors mt-0.5"
                                >
                                  {linkLabel(project.link)}
                                </a>
                              )}
                            </div>
                            <p className="text-sm text-neutral-400 leading-relaxed mt-2">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {project.tech.map((t) => (
                                <span
                                  key={t}
                                  className="text-xs text-neutral-600 border border-neutral-800 rounded px-1.5 py-0.5"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
