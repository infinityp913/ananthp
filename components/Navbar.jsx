import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = {
  '/': {
    name: 'home',
  },
  '/projects': {
    name: 'projects',
  },
  '/work': {
    name: 'work',
  },
  '/books': {
    name: 'books',
  },
};

export function Navbar() {
  const router = useRouter();

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = router.pathname === path;
              return (
                <Link
                  key={path}
                  href={path}
                  className={`transition-all hover:text-neutral-100 flex align-middle relative py-3 px-2 ${isActive ? 'text-neutral-200' : 'text-neutral-500'}`}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
