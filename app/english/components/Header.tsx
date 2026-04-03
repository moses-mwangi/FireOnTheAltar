import Link from "next/link";
import { Search, User, BookOpen } from "lucide-react";

const navItems = [
  { name: "English", href: "/english" },
  { name: "Philosophy", href: "/philosophy" },
  { name: "Psychology", href: "/psychology" },
  { name: "Writing", href: "/writing" },
  { name: "Bible", href: "/bible" },
];

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - links to home */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <BookOpen className="h-6 w-6 text-purple-600" />
            <span className="font-bold text-xl bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              The Reflective Mind
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <Search className="h-5 w-5 text-gray-500 cursor-pointer hover:text-purple-600" />
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
