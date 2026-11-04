'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  const getPath = (index: number) =>
    '/' + pathSegments.slice(0, index + 1).join('/');

  const customNames: Record<string, string> = {
    teacher: 'Teacher',
    'course-setup': 'Course Setup',
    // add more if needed
  };

  return (
    <nav className="text-sm text-gray-600 px-8 pt-2">
      <ul className="flex space-x-2">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          {pathSegments.length > 0 && <span className="mx-1">{'>'}</span>}
        </li>
        {pathSegments.map((seg, idx) => {
          const isLast = idx === pathSegments.length - 1;
          const href = getPath(idx);
          const label = customNames[seg] || seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

          return (
            <li key={href}>
              {!isLast ? (
                <>
                  <Link href={href} className="text-blue-600 hover:underline">{label}</Link>
                  <span className="mx-1">{'>'}</span>
                </>
              ) : (
                <span className="text-gray-900 font-semibold">{label}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
