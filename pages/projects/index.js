import Head from "next/head";
import { Navbar } from "@/components/Navbar";
import { Libre_Baskerville } from "next/font/google";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { groupByYear } from "@/lib/groupByYear";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const projects = [
  {
    title: "DonateIt",
    year: 2020,
    description:
      "A charitable donation platform that contextualizes contributions using cost-of-living data across countries, helping donors understand the real-world impact of their money.",
    tech: ["HTML5", "CSS", "JavaScript", "jQuery", "SCSS"],
    link: "https://devpost.com/software/donateit-4il5tg",
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
];

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
          } else {
            entry.target.classList.remove("is-visible");
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
              className={`font-semibold text-2xl text-white mb-2 ${libreBaskerville.className}`}
            >
              Projects
            </h1>
            <p className="text-neutral-500 text-sm mb-10">
              Hackathon builds and side projects.
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
                              {project.link ? (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-medium text-neutral-200 hover:text-white transition-colors"
                                >
                                  {project.title}
                                </a>
                              ) : (
                                <span className="font-medium text-neutral-200">
                                  {project.title}
                                </span>
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
