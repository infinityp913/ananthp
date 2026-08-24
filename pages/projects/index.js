import Head from "next/head";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Libre_Baskerville } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { groupByYear } from "@/lib/groupByYear";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const projects = [
  {
    title: "Pomelo",
    year: 2026,
    description:
      "AI-generated courses built around what you already know, not a MOOC catalog or a chat tool. A short qualifying chat identifies your background and target gap, Claude drafts a tailored chapter plan, and each chapter is generated on demand with formatted text, typeset LaTeX math, and optional video, plus a persistent per-chapter Q&A chat. Built with my brother Sid.",
    tech: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Claude API",
      "Tailwind CSS",
      "KaTeX",
    ],
    link: "https://learnpomelo.com",
    image: {
      src: "/projects/pomelo.png",
      alt: "A Pomelo chapter on RAG chunking strategies, with an embedded YouTube video enrichment and a per-chapter Q&A chat panel on the right",
      width: 1200,
      height: 653,
    },
  },
  {
    title: "TARP Field",
    year: 2026,
    description: (
      <>
        One of two repos powering an automation pipeline that lets
        nontechnical archaeologists turn raw drone photos into 3D models and
        research sheets, built for the{" "}
        <a
          href="https://air.ht.lu.se/s/tharros/page/home"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-neutral-300 transition-colors"
        >
          Tharros Archaeological Research Project
        </a>{" "}
        in Sardinia, Italy. TARP Field runs on-site: a kanban-style dashboard
        tracks each photo job from capture through preliminary Metashape
        alignment and handoff to the lab. Job status pushes to Google Sheets
        every 5 minutes to stay in sync with{" "}
        <a
          href="https://github.com/infinityp913/tarp-lab"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-neutral-300 transition-colors"
        >
          TARP Lab
        </a>
        , and misnamed job folders get flagged before anything goes missing.
      </>
    ),
    tech: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Google Sheets API",
      "dnd-kit",
      "Vite",
    ],
    link: "https://github.com/infinityp913/tarp-field",
  },
  {
    title: "TARP Lab",
    year: 2026,
    description: (
      <>
        The other half of the pipeline: TARP Lab picks up jobs handed off from{" "}
        <a
          href="https://github.com/infinityp913/tarp-field"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-neutral-300 transition-colors"
        >
          TARP Field
        </a>{" "}
        and turns them into finished 3D models and SU (stratigraphic unit)
        research sheets, all from a kanban dashboard, no command line or GIS
        experience required. Each job moves through 5 pipeline stages, and
        each unit through its own volumetrics pipeline (align → mesh → volume
        → SU sheet PDF). One click runs Metashape alignment, Poisson mesh
        reconstruction (CloudComPy), or georeferenced PDF generation (QGIS).
        Synced with Google Sheets so the Field and Lab machines share one
        source of truth.
      </>
    ),
    tech: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "CloudComPy",
      "QGIS",
      "Google Sheets API",
      "dnd-kit",
      "Vite",
    ],
    link: "https://github.com/infinityp913/tarp-lab",
    pipeline: {
      caption: "Raw field photo to publication-ready SU sheet PDF",
      steps: [
        {
          step: "01",
          label: "Field capture",
          caption: "Drone photos and GCP markers on site at Tharros, Sardinia.",
          image: {
            src: "/projects/tarp-pipeline-01-field-capture.webp",
            alt: "Archaeologists excavating a trench at the Tharros dig site in Sardinia, with GCP marker balls placed around the trench",
            width: 828,
            height: 1104,
          },
        },
        {
          step: "02",
          label: "Dashboard",
          caption:
            "The TARP Lab dashboard converts field photos into 3D models and SU documentation for each excavated unit.",
          image: {
            src: "/projects/tarp-pipeline-02-dashboard.webp",
            alt: "TARP Lab kanban dashboard showing photogrammetry jobs sorted into pipeline-stage columns",
            width: 828,
            height: 548,
          },
        },
        {
          step: "03",
          label: "3D volume model",
          caption:
            "Poisson-reconstructed OBJ mesh with 3D and 2.5D volumes (1.1M vertices).",
          image: {
            src: "/projects/tarp-pipeline-03-3d-model.webp",
            alt: "Poisson-reconstructed 3D mesh of an excavated trench viewed in a modeling application, showing 1.1 million vertices",
            width: 828,
            height: 572,
          },
        },
        {
          step: "04",
          label: "SU sheet PDF",
          caption:
            "Georeferenced orthophoto, DEM, and site context map, publication ready.",
          image: {
            src: "/projects/tarp-pipeline-04-su-sheet.webp",
            alt: "Publication-ready SU sheet PDF for Tharros Trench 17000, showing an orthophoto, digital elevation model, and site context map",
            width: 828,
            height: 493,
          },
        },
      ],
    },
  },
  {
    title: "Street Image Stitcher",
    year: 2026,
    description:
      "A web app that stitches Google Street View screenshots into a full-width street elevation panorama, automating a manual step in urban planners' building inception reports. Idea came from conversations with urban planners in Mumbai and Boston. Tried 14 stitching approaches before landing on a PIL pipeline with luminance normalization and sigmoid cross-fade blending. Next.js frontend with drag-to-reorder image sequencing, FastAPI backend.",
    tech: ["Next.js", "FastAPI", "Python", "PIL", "NumPy", "Vercel Blob"],
    link: "https://github.com/infinityp913/street-image-stitcher",
    image: {
      src: "/projects/street-stitcher.jpg",
      alt: "A stitched street elevation panorama of storefronts, produced from Google Street View screenshots",
      width: 1600,
      height: 142,
    },
  },
  {
    title: "I-JEPA",
    year: 2026,
    description: (
      <>
        A from-scratch PyTorch implementation of{" "}
        <a
          href="https://arxiv.org/abs/2301.08243"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-neutral-300 transition-colors"
        >
          I-JEPA
        </a>{" "}
        (Assran et al., Meta AI 2023), a self-supervised vision model that
        learns by predicting in representation space instead of reconstructing
        pixels. ViT backbone with a context encoder, EMA target encoder, and a
        predictor. Cut training time by parallelizing embedding generation and
        using mixed precision. Currently exploring RoPE embeddings and the
        Muon optimizer for further speedups.
      </>
    ),
    tech: ["PyTorch", "Python", "ViT", "Self-Supervised Learning"],
    link: "https://github.com/infinityp913/i-jepa",
  },
  {
    title: "AppFiller",
    year: 2026,
    description: (
      <>
        A browser extension that autofills job and accelerator applications
        using your profile and your own Claude API key. Add your profile
        once, fill any form in seconds, in Job mode (personal profile) or
        Accelerator mode (personal + startup profile). It scans every frame
        for fillable fields, including shadow DOM and cross-origin iframes,
        sends them to Claude with your profile as context, and writes the
        answers back using native input setters so React, Vue, and other
        frameworks register the change.
      </>
    ),
    tech: [
      "TypeScript",
      "Safari",
      "Chrome",
      "Claude Opus 4.7",
      "Anthropic API",
      "Bun",
    ],
    link: "https://github.com/infinityp913/application-filler",
  },
  {
    title: "Agentic GIS",
    year: 2026,
    description:
      "AI-powered pipeline that automates planset creation for urban bike lane infrastructure. Takes a street address and produces a 2-sheet PDF with gap analysis and plan drawings in under 40 seconds — collapsing what typically takes days into minutes. Uses NetworkX for topology-based connectivity gap detection, GeoPandas for map visualization, and Claude vision for generating engineering documents (cross-sections, construction notes, specs, quantity estimates). Built with my brother Sid.",
    tech: [
      "Python",
      "Claude",
      "NetworkX",
      "GeoPandas",
      "OpenStreetMap",
      "ReportLab",
    ],
    link: "https://github.com/sid0913/agentic-gis",
    image: {
      src: "/projects/agentic-gis.png",
      alt: "Auto-generated bike lane cross-section diagram showing sidewalk, raised bike lane, flex-post separator, and travel lane widths",
      width: 1600,
      height: 226,
    },
  },
  {
    title: "HabitTracker",
    year: 2026,
    description:
      "A minimal iPhone habit tracker with a home screen widget. Track one habit, see your streak — that's it. Built with Swift and WidgetKit: a small widget shows the streak count, a medium widget has interactive check/X buttons via AppIntents. Daily notifications with inline actions, a configurable start date to preserve existing streaks, and all data stored in a shared App Group so the widget and app stay in sync.",
    tech: ["Swift", "SwiftUI", "WidgetKit", "AppIntents", "iOS 17"],
    link: "https://github.com/infinityp913/habit-tracker",
    image: {
      src: "/projects/habit-tracker.png",
      alt: 'HabitTracker home screen showing a 9-day streak for "Avoid social media" with Done and Missed buttons',
      width: 700,
      height: 1516,
    },
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
    title: "CloudCompare Automation for Archaeological Volumetrics",
    year: 2025,
    description: (
      <>
        Built in Sardinia, Italy as part of the Tharros Archaeological Research
        project. A script to automate volumetric generation for excavated
        stratigraphic units (SUs) using CloudCompare processes, producing 3D
        objects viewable from all angles for post-excavation analysis and record
        keeping. Collaborated with the University of Cincinnati. Output is
        archived on{" "}
        <a
          href="https://air.ht.lu.se/s/tharros/page/home"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-neutral-300 transition-colors"
        >
          A.I.R.
        </a>
        , a visual archival platform for archaeological projects built by Paola
        Derudas at Lund University.
      </>
    ),
    tech: ["Python", "CloudCompare", "3D Volumetrics", "Archaeology"],
    link: "https://github.com/infinityp913/cloudcomparescript",
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
    image: {
      src: "/projects/ria-voice.png",
      alt: "Ria Voice's Documents dashboard listing uploaded PDFs the voice agent can reference",
      width: 1400,
      height: 524,
    },
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
    image: {
      src: "/projects/palp.png",
      alt: "PALP's interactive map of Pompeii artwork findspots alongside a gallery of fresco photographs",
      width: 1200,
      height: 916,
    },
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
    image: {
      src: "/projects/readable.jpg",
      alt: "Readable capturing a page of book text with a phone camera to read it aloud",
      width: 1200,
      height: 675,
    },
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
    title: "Induino Ultrasonic Distance Measurer",
    year: 2012,
    description:
      "Built on Induino — a low-cost, Indian alternative to Arduino. An ultrasonic sensor fires sound waves and measures the distance to the nearest object by timing how long the echo takes to return, using the speed of sound to convert time into distance.",
    tech: ["Induino", "C++", "Ultrasonic Sensor", "Embedded Systems"],
  },
  {
    title: "VR Headset for Education",
    year: 2019,
    description:
      "A prototype educational VR headset built from a Jetson Nano, Google Cardboard, Unreal Engine and TensorRT. Developed hand-tracking neural nets for embedded inference (TFLite/LiteRT) to control the interface with hands. Built a whiteboard app with finger-drawing and educational content.",
    tech: [
      "Jetson Nano",
      "Unreal Engine",
      "TFLite",
      "TensorRT",
      "Computer Vision",
      "C++",
    ],
  },
];

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function linkLabel(href) {
  if (!href) return "Open ↗︎";
  if (href.includes("github.com")) return "GitHub ↗︎";
  if (href.includes("devpost.com")) return "Devpost ↗︎";
  return "Open ↗︎";
}

const yearGroups = groupByYear(projects);
const flatProjects = yearGroups.flatMap((g) => g.projects);

export default function ProjectsPage() {
  const cardRefs = useRef([]);
  const [expandedImages, setExpandedImages] = useState({});

  function toggleImage(title) {
    setExpandedImages((prev) => ({ ...prev, [title]: !prev[title] }));
  }

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
      { threshold: 0.1 },
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
                            {project.image &&
                              (() => {
                                const imageId = `project-image-${slugify(project.title)}`;
                                const isOpen = !!expandedImages[project.title];
                                return (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => toggleImage(project.title)}
                                      aria-expanded={isOpen}
                                      aria-controls={imageId}
                                      className="mt-3 text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
                                    >
                                      {isOpen ? "Hide screenshot" : "Show screenshot"}{" "}
                                      {isOpen ? "▲" : "▼"}
                                    </button>
                                    {isOpen && (
                                      <div
                                        id={imageId}
                                        className="mt-3 rounded border border-neutral-800 bg-neutral-900 p-2 project-image-reveal"
                                      >
                                        <Image
                                          src={project.image.src}
                                          alt={project.image.alt}
                                          width={project.image.width}
                                          height={project.image.height}
                                          sizes="(min-width: 672px) 640px, 100vw"
                                          className="w-full h-auto max-h-[420px] object-contain rounded"
                                        />
                                      </div>
                                    )}
                                  </>
                                );
                              })()}
                            {project.pipeline &&
                              (() => {
                                const imageId = `project-pipeline-${slugify(project.title)}`;
                                const isOpen = !!expandedImages[project.title];
                                return (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => toggleImage(project.title)}
                                      aria-expanded={isOpen}
                                      aria-controls={imageId}
                                      className="mt-3 text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
                                    >
                                      {isOpen ? "Hide pipeline" : "Show pipeline"}{" "}
                                      {isOpen ? "▲" : "▼"}
                                    </button>
                                    {isOpen && (
                                      <div
                                        id={imageId}
                                        className="mt-3 rounded border border-neutral-800 bg-neutral-900 p-3 project-image-reveal"
                                      >
                                        <p className="text-[10px] tracking-widest text-neutral-600 uppercase mb-3">
                                          {project.pipeline.caption}
                                        </p>
                                        <div className="flex items-start gap-3 overflow-x-auto pb-1">
                                          {project.pipeline.steps.map((step, i) => (
                                            <div
                                              key={step.label}
                                              className="flex items-start flex-shrink-0"
                                            >
                                              {i > 0 && (
                                                <span
                                                  aria-hidden="true"
                                                  className="mt-12 sm:mt-14 mr-3 flex-shrink-0 text-neutral-700"
                                                >
                                                  →
                                                </span>
                                              )}
                                              <div className="w-32 sm:w-36 flex-shrink-0">
                                                <Image
                                                  src={step.image.src}
                                                  alt={step.image.alt}
                                                  width={step.image.width}
                                                  height={step.image.height}
                                                  sizes="144px"
                                                  className="h-24 sm:h-28 w-full object-cover rounded border border-neutral-800"
                                                />
                                                <p className="mt-2 text-[10px] tracking-widest text-neutral-500">
                                                  {step.step} · {step.label}
                                                </p>
                                                <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                                                  {step.caption}
                                                </p>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </>
                                );
                              })()}
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
