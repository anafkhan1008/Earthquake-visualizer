// ...existing code...
import { Search } from "lucide-react";

export default function SearchBox({ search, setSearch }) {
  return (
    <div className="relative">
      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 dark:text-blue-400" />
      <input
        type="text"
        placeholder="Search by location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 
                   bg-white/20 dark:bg-gray-800/40 
                   backdrop-blur-sm 
                   border border-white/30 dark:border-gray-600 
                   rounded-lg 
                   text-white placeholder-blue-200 dark:placeholder-gray-400 
                   focus:outline-none 
                   focus:bg-white/30 dark:focus:bg-gray-700/60 
                   transition-colors"
      />
    </div>
  );
}
