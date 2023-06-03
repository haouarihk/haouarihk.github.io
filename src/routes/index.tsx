import { component$ } from "@builder.io/qwik";
import { DocumentHead, Link } from "@builder.io/qwik-city";
import Madeusing from "~/components/madeusing";
import User from "~/components/user";

export default component$(() => {
  const btns = (
    <>
      <a href="/cv.pdf" class="btn flex xl:hidden gap-3">
        <img
          width={20}
          height={20}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png"
        />
      </a>
      <Link href="/projects" class="btn btn-primary w-24">
        Projects
      </Link>
    </>
  );

  return (
    <div class="w-full h-full backdrop-blur-0 bg-transparent select-none">
      {/* head */}
      <div class="hero relative text-white flex items-center justify-center bg-cover h-screen">
        {/* <div class="hero-overlay bg-opacity-60"></div> */}
        <div class="hero-content flex flex-col md:flex-row gap-24 xl:gap-80">
          <div class="flex flex-col gap-12">
            <h1 class="text-4xl">
              <span class="font-bold">Professional</span>
              <br />
              <q class="italic">Web Developer</q>
            </h1>
            <div class="justify-between items-center w-full hidden md:flex">
              {btns}
            </div>
          </div>
          <div class="flex kk flex-col gap-12 min-w-fit border-white">
            <User className="flex-col w-60" size={"200px"} />

            <div class="flex justify-between items-center w-full md:hidden">
              {btns}
            </div>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 px-4 w-full">
          <Madeusing />
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "haitam kouider",
};
