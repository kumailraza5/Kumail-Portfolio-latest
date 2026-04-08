export function Footer() {
  return (
    <footer className="py-8 px-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-500">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="font-bold text-lg bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
          KR
        </span>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Kumail Raza. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Flutter Developer
        </p>
      </div>
    </footer>
  );
}
