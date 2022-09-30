import { component$ } from "@builder.io/qwik";

export default component$(
  (props: {
    className?: string;
    size?: number;
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
            height={props.size}
            width={props.size}
            class="bg-pink-400  rounded-full overflow-hidden"
            src="/pfp.jpeg"
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
