import { forwardRef } from 'react';
import Link from 'next/link';
import {
  HomeIcon,
  CreditCardIcon,
  UserIcon,
  ChartPieIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();

  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
      <div className="flex justify-center mt-6 mb-10">
        <picture>
          <img
            className="w-24 h-auto rounded-full"
            src="/img/heydomedia.jpg"
            alt="company logo"
          />
        </picture>
      </div>

      <div
        className="pl-5 pr-7 fixed overflow-auto h-5/6 z-0 w-56"
        // className="layout-sidebar"
      >
        <ul>
          <li>
            <div className=" uppercase font-semibold text-gray-700 m-1 text-sm">
              Home
            </div>
          </li>
          <ul>
            <li>
              <Link
                href="/"
                className={`p-[.75rem] cursor-pointer flex items-center transition-colors ${
                  router.pathname == '/'
                    ? 'bg-orange-100 text-orange-500'
                    : 'text-[#3f3f46] hover:bg-bg-primary-hover/50 hover:text-text-primary-hover rounded-xl'
                }`}
              >
                <HomeIcon className="h-5 w-5 mr-3" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboards"
                className={`p-[.75rem] cursor-pointer flex items-center transition-colors ${
                  router.pathname == '/dashboards'
                    ? 'bg-orange-100 text-orange-500'
                    : 'text-[#3f3f46] hover:bg-bg-primary-hover/50 hover:text-text-primary-hover rounded-xl'
                }`}
              >
                <ChartPieIcon className="h-5 w-5 mr-3" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className={`p-[.75rem] cursor-pointer flex items-center transition-colors ${
                  router.pathname == '/'
                    ? 'bg-orange-100 text-orange-500'
                    : 'text-[#3f3f46] hover:bg-bg-primary-hover/50 hover:text-text-primary-hover rounded-xl'
                }`}
              >
                <HomeIcon className="h-5 w-5 mr-3" />
                <span>Home</span>
              </Link>
            </li>
          </ul>
        </ul>
        <ul>
          <li>
            <div className=" uppercase font-semibold text-gray-700 m-1 text-sm">
              Home
            </div>
          </li>
          <ul>
            <li>
              <Link
                href="/"
                className={`p-[.75rem] cursor-pointer flex items-center transition-colors ${
                  router.pathname == '/'
                    ? 'bg-orange-100 text-orange-500'
                    : 'text-[#3f3f46] hover:bg-bg-primary-hover/50 hover:text-text-primary-hover rounded-xl'
                }`}
              >
                <HomeIcon className="h-5 w-5 mr-3" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className={`p-[.75rem] cursor-pointer flex items-center transition-colors ${
                  router.pathname == '/'
                    ? 'bg-orange-100 text-orange-500'
                    : 'text-[#3f3f46] hover:bg-bg-primary-hover/50 hover:text-text-primary-hover rounded-xl'
                }`}
              >
                <HomeIcon className="h-5 w-5 mr-3" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className={`p-[.75rem] cursor-pointer flex items-center transition-colors ${
                  router.pathname == '/'
                    ? 'bg-orange-100 text-orange-500'
                    : 'text-[#3f3f46] hover:bg-bg-primary-hover/50 hover:text-text-primary-hover rounded-xl'
                }`}
              >
                <HomeIcon className="h-5 w-5 mr-3" />
                <span>Home</span>
              </Link>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
});

SideBar.displayName = 'SideBar';

export default SideBar;
