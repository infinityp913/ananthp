import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Libre_Baskerville } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/Card";
import { formatDate } from "@/lib/formatDate";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export default function NotesPage({ notes = [] }) {
  const router = useRouter();
  const [tag, setTag] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fromUrl = router?.query?.tag;
    if (typeof fromUrl === "string") setTag(fromUrl);
  }, [router?.query?.tag]);

  const tags = useMemo(() => {
    const counts = {};
    notes.forEach((n) =>
      n.tags.forEach((t) => (counts[t] = (counts[t] || 0) + 1)),
    );
    return Object.keys(counts).sort(
      (a, b) => counts[b] - counts[a] || a.localeCompare(b),
    );
  }, [notes]);

  const visible = notes.filter((n) => {
    if (tag && !n.tags.includes(tag)) return false;
    if (!query.trim()) return true;
    const q = query.trim().toLowerCase();
    return [n.title, n.description, ...n.tags]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });

  return (
    <>
      <Head>
        <title>Notes | ananthpreetham</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Notes, ideas and things Ananth Preetham is learning."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="w-screen m-auto pb-16 px-6 sm:px-20 lg:px-0 max-w-2xl text-neutral-200">
        <div className="flex w-full">
          <div className="mt-[5rem] w-full">
            <Navbar />
            <h1
              className={`font-semibold text-2xl text-white mb-2 ${libreBaskerville.className}`}
            >
              Notes
            </h1>
            <p className="text-neutral-500 text-sm mb-8">
              Half-finished thoughts. Written in Obsidian, published
              at once.
            </p>

            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes"
              aria-label="Search notes"
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
            />

            {tags.length > 0 && (
              <div
                className="flex flex-wrap gap-2 mt-4 mb-8"
                aria-label="Filter by tag"
              >
                {tags.map((t) => {
                  const active = tag === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setTag(active ? null : t)}
                      className={`text-xs rounded-full border px-3 py-1.5 transition-colors ${
                        active
                          ? "border-neutral-500 text-neutral-200 bg-neutral-800"
                          : "border-neutral-800 text-neutral-500 hover:text-neutral-300"
                      }`}
                    >
                      #{t}
                    </button>
                  );
                })}
              </div>
            )}

            {visible.length === 0 ? (
              <p className="text-neutral-500 text-sm mt-8">
                No notes here yet.
              </p>
            ) : (
              <ul className="list-none space-y-3 mt-6">
                {visible.map((note) => (
                  <li key={note.slug}>
                    <Card
                      as={Link}
                      href={`/notes/${note.slug}`}
                      interactive
                      className="group"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-medium text-neutral-200 group-hover:text-white">
                          {note.title}
                        </span>
                        {note.date && (
                          <time
                            dateTime={note.date}
                            className="shrink-0 text-xs text-neutral-500"
                          >
                            {formatDate(note.date)}
                          </time>
                        )}
                      </div>
                      {note.description && (
                        <p className="text-sm text-neutral-400 leading-relaxed mt-2">
                          {note.description}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 text-xs text-neutral-500">
                        <span>{note.readingTime} min read</span>
                        {note.tags.map((t) => (
                          <span key={t}>#{t}</span>
                        ))}
                      </div>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const { getAllNotes, toSummary } = await import("@/lib/notes");
  return { props: { notes: getAllNotes().map(toSummary) } };
}
