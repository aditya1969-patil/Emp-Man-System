import { useState } from 'react';
import Link from 'next/link';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-xl font-semibold"
      >
        <span>Menu</span>
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 6.293a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48">
          <Link
          
            href="/work-report"
            className="block px-4 py-2 hover:bg-gray-200"
          >
            Work Report
          </Link>
          <Link
            href="/leave-application"
            className="block px-4 py-2 hover:bg-gray-200"
          >
            Leave Application
          </Link>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
