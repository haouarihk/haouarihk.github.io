import { component$, useClientEffect$, useStore } from "@builder.io/qwik";

export function randomNumber(max: number, min?: number) {
  return Math.floor(Math.random() * max) + (min || 0);
}

export function randomFromArray(arr: any[]) {
  return arr[randomNumber(arr.length || 0)];
}

export function clamp(val: number, max: number, min?: number) {
  return Math.min(Math.max(val, min || 0), max);
}

export const step = 20;
export const numberOfItems = 20;

export const shapes = ["square", "tri", "cir"];

export const directions = [
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

export default component$(() => {
  const storage = useStore<{
    windowWidth: number;
    windowHeight: number;
    items: {
      shape: "square" | "tri" | "cir";
      dx: number;
      dy: number;
      dr: number;
      x: number;
      y: number;
      rotation: number;
    }[];
  }>({
    windowWidth: 100,
    windowHeight: 100,
    items: [],
  });

  //   check for resizing
  useClientEffect$(() => {
    console.log("event fired");
    const k = (e: any) => {
      console.log({ ...e.target });
      storage.windowWidth = e.target?.innerWidth || 100;
      storage.windowHeight = e.target?.innerHeight || 100;
    };
    window.addEventListener("resize", k);

    window.dispatchEvent(new Event("resize"));

    return () => {
      window?.removeEventListener?.("resize", k);
    };
  });

  // animate
  useClientEffect$(() => {
    //---- init
    const items: any = [];
    for (let i = 0; i < numberOfItems; i++) {
      const randomShape = randomFromArray(shapes);
      const randomDirection = randomFromArray(directions);
      items[i] = {
        shape: randomShape,
        x: randomNumber(storage.windowWidth),
        y: randomNumber(storage.windowHeight),
        rotation: Math.random() * 190,
        dx: randomDirection.x * Math.random() * step,
        dy: randomDirection.y * Math.random() * step,
        dr: 0,
      };
    }
    storage.items = items;
    //

    const int1: any = setInterval(() => {
      const items = [...storage.items];
      for (let i = 0; i < items.length; i++) {
        const randomRotation = Math.random() * 190 - 90;
        const randomDirection = randomFromArray(directions);

        items[i].dx = randomDirection.x * Math.random() * step;
        items[i].dy = randomDirection.y * Math.random() * step;
        items[i].dr = randomRotation;
      }
      storage.items = items;
    }, 5000);

    const int2: any = setInterval(() => {
      const items = [...storage.items];
      for (let i = 0; i < items.length; i++) {
        items[i].x += items[i].dx;
        items[i].y += items[i].dy;
        items[i].rotation += items[i].dr;
        items[i].dx *= 0.95;
        items[i].dy *= 0.95;
        items[i].dr *= 0.95;
        items[i].x = clamp(items[i].x, storage.windowWidth);
        items[i].y = clamp(items[i].y, storage.windowHeight);
        items[i].rotation = clamp(items[i].rotation, 180);
      }
      storage.items = items;
    }, 100);

    return () => {
      clearInterval(int1);
      clearInterval(int2);
    };
  });

  return (
    <div class="gap-3 p-10 bg-black text-white h-screen overflow-hidden">
      {storage.items.map((e, i) => {
        switch (e.shape) {
          case "tri":
            return (
              <div
                key={i}
                className="absolute aspect-square w-0 h-0 transition-all"
                style={{
                  left: e.x + "px",
                  top: e.y + "px",
                  borderLeft: "25px solid transparent",
                  borderRight: "25px solid transparent",
                  borderTop: "50px solid #555",
                  transform: `rotate(${e.rotation}deg)`,
                }}
              />
            );
          case "cir":
            return (
              <div
                key={i}
                className="absolute aspect-square bg-primary w-10 h-10 roudned-full overflow-hidden transition-all"
                style={{
                  left: e.x + "px",
                  top: e.y + "px",
                  transform: `rotate(${e.rotation}deg)`,
                }}
              />
            );

          default:
            return (
              <div
                key={i}
                className="absolute aspect-square bg-[#555] w-10 h-10 transition-all"
                style={{
                  left: e.x + "px",
                  top: e.y + "px",
                  transform: `rotate(${e.rotation}deg)`,
                }}
              />
            );
        }
      })}
      <div className="w-screen h-screen top-0 left-0 absolute backdrop-blur-sm backdrop-brightness-50" />
    </div>
  );
});
