import { component$ } from "@builder.io/qwik";

export default component$(
  (props: {
    className?: string;
    size?: any;
    onlyPfp?: boolean;
    online?: boolean;
    ring?: boolean;
    children?: any;
  }) => {
    return (
      <div class={`flex gap-4 items-center ${props.className}`}>
        <div
          class={`avatar h-full ${
            props.online == true ? "online" : props.online == false && "offline"
          }`}
        >
          <img
            draggable="false"
            alt="user-picture"
            height={props.size}
            width={props.size}
            class="bg-pink-400 select-none rounded-full overflow-hidden"
            src="https://avatars.githubusercontent.com/u/57036855?s=400&u=d2750433460c2ac55a3d70fec28391677f5b41c9&v=4"
          />
        </div>

        {!props.onlyPfp && (
          <>
            <div class="text-center">
              <p class="text-xl inline md:block">Haouari </p> Haitam Kouider
            </div>
            {props.children}
          </>
        )}
      </div>
    );
  }
);
