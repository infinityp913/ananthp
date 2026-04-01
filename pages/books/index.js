import Head from "next/head";
import { Navbar } from "@/components/Navbar";
import { StarRating } from "@/components/StarRating";
import { Libre_Baskerville } from "next/font/google";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const currentlyReading = [
  { title: "Dune", author: "Frank Herbert" },
  { title: "11/22/63", author: "Stephen King" },
];

const books = [
  { title: "Project Hail Mary", author: "Andy Weir", rating: 5 },
  { title: "The Gene: An Intimate History", author: "Siddhartha Mukherjee", rating: 5 },
  { title: "Man's Search for Meaning", author: "Viktor E. Frankl", rating: 4.5 },
  { title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", rating: 4.5 },
  { title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey", rating: 4.5 },
  { title: "Animal Farm", author: "George Orwell", rating: 4 },
  { title: "Nineteen Eighty-Four", author: "George Orwell", rating: 4 },
  { title: "And Then There Were None", author: "Agatha Christie", rating: 5 },
  { title: "The Murder of Roger Ackroyd", author: "Agatha Christie", rating: 4.5 },
  { title: "Five Little Pigs", author: "Agatha Christie", rating: 4 },
];

export default function BooksPage() {
  return (
    <>
      <Head>
        <title>Books | ananthp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Books Ananth Preetham has read, with ratings."
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
              Books
            </h1>
            <p className="text-neutral-500 text-sm mb-10">
              What I&apos;ve been reading.
            </p>

            <p className="text-neutral-500 text-xs uppercase tracking-widest mb-4">
              Currently reading
            </p>
            <ul className="list-none space-y-5 mb-10">
              {currentlyReading.map((book) => (
                <li key={book.title} className="flex items-start gap-3">
                  <div className="min-w-0">
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(book.title + " " + book.author)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-neutral-200 text-sm hover:text-white transition-colors"
                    >
                      {book.title}
                    </a>
                    <p className="text-neutral-500 text-xs mt-0.5">
                      {book.author}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="text-neutral-500 text-xs uppercase tracking-widest mb-4">
              Read
            </p>
            <ul className="list-none space-y-5">
              {books.map((book) => (
                <li key={book.title} className="flex items-start gap-3">
                  <StarRating rating={book.rating} />
                  <div className="min-w-0">
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(book.title + " " + book.author)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-neutral-200 text-sm hover:text-white transition-colors"
                    >
                      {book.title}
                    </a>
                    <p className="text-neutral-500 text-xs mt-0.5">
                      {book.author}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
