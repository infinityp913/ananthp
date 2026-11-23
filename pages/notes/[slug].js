import Head from "next/head";
import Link from "next/link";
import { Libre_Baskerville } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/Card";
import { formatDate } from "@/lib/formatDate";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export default function NotePage({ note }) {
  return (
    <>
      <Head>
        <title>{`${note.title} | ananthp`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {note.description && (
          <meta name="description" content={note.description} />
        )}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="w-screen m-auto pb-16 px-6 sm:px-20 lg:px-0 max-w-2xl text-neutral-200">
        <div className="flex w-full">
          <div className="mt-[5rem] w-full">
            <Navbar />
            <Link
              href="/notes"
              className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              ← All notes
            </Link>
            <h1
              className={`font-semibold text-2xl text-white mt-4 mb-3 ${libreBaskerville.className}`}
            >
              {note.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-600 mb-10">
              {note.date && (
                <time dateTime={note.date}>{formatDate(note.date)}</time>
              )}
              {note.updated && note.updated !== note.date && (
                <span>updated {formatDate(note.updated)}</span>
              )}
              <span>{note.readingTime} min read</span>
              {note.tags.map((t) => (
                <Link
                  key={t}
                  href={`/notes?tag=${encodeURIComponent(t)}`}
                  className="hover:text-neutral-300 transition-colors"
                >
                  #{t}
                </Link>
              ))}
            </div>

            <article
              className="note-content"
              dangerouslySetInnerHTML={{ __html: note.html }}
            />

            {note.backlinks.length > 0 && (
              <Card className="mt-14">
                <h2 className="text-neutral-500 text-xs uppercase tracking-widest mb-3">
                  Linked from
                </h2>
                <ul className="list-none space-y-1">
                  {note.backlinks.map((b) => (
                    <li key={b.slug}>
                      <Link
                        href={`/notes/${b.slug}`}
                        className="text-sm text-neutral-300 hover:text-white transition-colors"
                      >
                        {b.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  const { getAllNotes } = await import("@/lib/notes");
  return {
    paths: getAllNotes().map((n) => ({ params: { slug: n.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { getAllNotes } = await import("@/lib/notes");
  const note = getAllNotes().find((n) => n.slug === params.slug);
  return { props: { note } };
}
