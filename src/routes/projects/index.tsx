import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export const projects = [
  {
    name: "obsidian textgenerator plugin",
    description:
      "Text generator is a handy plugin for Obsidian that helps you generate text content using GPT-3 (OpenAI).",
    github: "https://github.com/nhaouari/obsidian-textgenerator-plugin",
  },
  {
    name: "model2API",
    type: "co-author",
    description:
      "Local GUI embedding API",
    image: "https://user-images.githubusercontent.com/57036855/267922637-c7d35e97-aed9-4826-a68d-58b33d36a901.png",
    github: "https://github.com/youwriteai/model2API",
  },
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
          {e.image && <figure>
            <img src={e.image} alt="Shoes" />
          </figure>}
          <div class="card-body">
            <h2 class="card-title">{e.name} <div class="badge badge-neutral">{e.type || "Creator"}</div></h2>
            <p>{e.description}</p>
            <div class="card-actions justify-end">
              <a href={e.github} class="btn">Github</a>
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
