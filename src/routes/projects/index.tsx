import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export const projects = [
  {
    name: "Golang templating tool",
    description:
      "it's a simple engine that's used for discord bots for templating users info and levels into a graphical image",
    image: "/projects/golangtemplatorBanner.webp",
    github: "https://github.com/haouarihk/goImgTemplator",
  },
];

export default component$(() => {
  return (
    <div class="z-30 text-white flex flex-wrap gap-8 overflow-auto mt-20 justify-evenly items-center ">
      {projects.map((e) => (
        <div key={e.name} class="card w-96 shadow-xl image-full">
          <figure>
            <img src={e.image} alt="Shoes" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">{e.name}</h2>
            <p>{e.description}</p>
            <div class="card-actions justify-end">
              <button class="btn">Github</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export const head: DocumentHead = {
  title: "projects",
};
