import { component$, useStore } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import User from "../user";
import Darkmode from "./darkmode";

export const links: { [key: string]: string } = {
  Main: "/",
  Projects: "/projects",
  Submissions: "/submissions",
};

export const LinkItem = component$((props: { to: string; name: string }) => {
  const router = useLocation();
  const currentPage = router.pathname == props.to;
  return (
    <li>
      <a
        href={props.to}
        class={
          currentPage
            ? "block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
            : "block py-2 pr-4 pl-3 text-white hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        }
        aria-current="page"
      >
        {props.name}
      </a>
    </li>
  );
});

export default component$(() => {
  const store = useStore({
    open: false,
  });
  return (
    <nav class="fixed z-30 select-none text-white top-0 w-screen bg-transparent border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/cv.pdf" class="btn gap-3 hidden xl:flex">
          <img
            width={20}
            height={20}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png"
          />
        </a>
        <Darkmode />
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick$={() => (store.open = !store.open)}
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="flex flex-col p-4 mt-4 text-white rounded-lg border  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {Object.keys(links).map((name) => (
              <LinkItem name={name} to={links[name]} />
            ))}
          </ul>
        </div>

        {store.open && (
          <div class="w-full md:w-auto" id="navbar-default">
            <ul class="flex flex-col p-4 mt-4 text-white bg-black rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {Object.keys(links).map((name) => (
                <LinkItem name={name} to={links[name]} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
});
