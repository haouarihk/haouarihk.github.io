import {
  $,
  component$,
  useClientEffect$,
  useMount$,
  useStore,
} from "@builder.io/qwik";

export function randomNumber(max: number, min?: number) {
  return Math.floor(Math.random() * max) + (min || 0);
}

export function randomizeArray(arr: any[]) {
  return arr.sort((a, b) => Math.random() - 0.5);
}

export function clamp(val: number, max: number, min?: number) {
  return Math.min(Math.max(val, min || 0), max);
}

export const step = 20;
export const numberOfItems = 20;

export const shapes = ["square", "tri", "cir"];

export const directions = [
  { x: 1, y: 1 },
  { x: 1, y: 0 },
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

  const applyForce = $((pointB: { x: number; y: number }, strength: number) => {
    const items = [...storage.items];
    for (let i = 0; i < items.length; i++) {
      const randomRotation = Math.random() * 190 - 90;
      const distance = Math.sqrt(
        (pointB.x - items[i].x) ** 2 + (pointB.y - items[i].y) ** 2
      );
      items[i].dx +=
        (clamp(pointB.x - items[i].x, 1, -1) * strength) / distance;
      items[i].dy +=
        (clamp(pointB.y - items[i].y, 1, -1) * strength) / distance;
      items[i].dr = randomRotation;
    }
    storage.items = items;
  });

  const randomize = $(() => {
    const items = [...storage.items];
    const randomArray = randomizeArray(directions);
    for (let i = 0; i < items.length; i++) {
      const randomDirection =
        randomArray[i - items.length * Math.floor(i / items.length)];
      items[i].dx += randomDirection.x * step;
      items[i].dy += randomDirection.y * step;
      items[i].dr += Math.random() * 120 - 120;
    }
    storage.items = items;
  });

  // animate
  useClientEffect$(() => {
    //---- init
    const items: any = [];

    const nOfItems =
      window.innerWidth > 576 ? numberOfItems : numberOfItems / 2;

    const cItem = () => {
      const randomShape = randomizeArray(shapes)[0];
      const randomDirection = randomizeArray(directions)[0];
      return {
        shape: randomShape,
        x: randomNumber(storage.windowWidth),
        y: randomNumber(storage.windowHeight),
        rotation: Math.random() * 190,
        dx: randomDirection.x * Math.random() * step,
        dy: randomDirection.y * Math.random() * step,
        dr: 0,
      };
    };

    for (let i = 0; i < nOfItems; i++) {
      items[i] = cItem();
    }
    storage.items = items;
    //

    const int1: any = setInterval(
      () => window.requestAnimationFrame(randomize),
      5000
    );

    const update = () => {
      const items = [...storage.items];
      for (let i = 0; i < items.length; i++) {
        items[i].x += items[i].dx;
        items[i].y += items[i].dy;
        items[i].rotation += items[i].dr;

        if (items[i].x < 0) {
          items[i].x = 0;
          items[i].dx *= -0.9;
        }

        if (items[i].x > storage.windowWidth - 40) {
          items[i].x = storage.windowWidth - 40;
          items[i].dx *= -0.9;
        }

        if (items[i].y < 0) {
          items[i].y = 0;
          items[i].dy *= -0.9;
        }

        if (items[i].y > storage.windowHeight - 40) {
          items[i].y = storage.windowHeight - 40;
          items[i].dy *= -0.9;
        }

        items[i].rotation = clamp(items[i].rotation, 180);

        // resistant
        items[i].dx *= 0.95;
        items[i].dy *= 0.95;
        items[i].dr *= 0.95;
      }
      storage.items = items;

      window.requestAnimationFrame(update);
    };

    window.requestAnimationFrame(update);

    return () => {
      clearInterval(int1);
    };
  });

  return (
    <div
      class="gap-3 p-10 bg-black text-white h-screen overflow-hidden"
      window:onClick$={(e) => {
        applyForce(
          {
            x: e.clientX,
            y: e.clientY,
          },
          -step * 100
        );
      }}
    >
      {storage.items.map((e, i) => {
        switch (e.shape) {
          case "tri":
            return (
              <div
                key={i}
                className="absolute aspect-square w-0 h-0"
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
                className="absolute aspect-square bg-primary w-10 h-10 roudned-full overflow-hidden "
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
                className="absolute aspect-square bg-[#555] w-10 h-10 "
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
