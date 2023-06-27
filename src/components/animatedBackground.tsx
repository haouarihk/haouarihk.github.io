import { $, component$, useClientEffect$, useStore } from "@builder.io/qwik";

export interface Intity {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function randomNumber(max: number, min?: number) {
  return Math.floor(Math.random() * max) + (min || 0);
}

export function randomizeArray(arr: any[]) {
  return arr.sort(() => Math.random() - 0.5);
}

export function clamp(val: number, max: number, min?: number) {
  return Math.min(Math.max(val, min || 0), max);
}

export const step = 0.009;
export const numberOfItems = 42;
export const minSpeed = 0.1;
export const maxSpeed = 1;
export const maxAcc = 0.4;
export const airResistant = 0.9;

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
      ax: number;
      ay: number;
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
      // console.log({ ...e.target });
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
      // const randomRotation = Math.random() * 190 - 90;
      const distance = Math.sqrt(
        (pointB.x - items[i].x) ** 2 + (pointB.y - items[i].y) ** 2
      );

      items[i].dx +=
        (5 * (clamp(pointB.x - items[i].x - 20, 1, -1) * strength)) / distance;
      items[i].dy +=
        (5 * (clamp(pointB.y - items[i].y - 20, 1, -1) * strength)) / distance;

      // items[i].dr = randomRotation;
    }
    storage.items = items;
  });

  const randomize = $(() => {
    const items = [...storage.items];
    const randomArray = randomizeArray(directions);
    for (let i = 0; i < items.length; i++) {
      const k = directions.length * Math.floor(i / directions.length);
      const randomDirection = randomArray[i - k];
      items[i].ax += randomDirection.x * step;
      items[i].ay += randomDirection.y * step;
      items[i].dx += randomDirection.x * step;
      items[i].dy += randomDirection.y * step;
      // items[i].dr += Math.random() * 120 - 120;
    }
    storage.items = items;
  });

  // animate
  useClientEffect$(() => {
    //---- init
    const items: any = [];

    const nOfItems =
      window.innerWidth > 576 ? numberOfItems : numberOfItems / 4;

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
        ax: randomDirection.x * Math.random() * step,
        ay: randomDirection.y * Math.random() * step,
        dr: 0,
      };
    };

    for (let i = 0; i < nOfItems; i++) {
      items[i] = cItem();
    }
    storage.items = items;
    //

    const int1 = setInterval(
      () => window.requestAnimationFrame(randomize),
      5000
    );

    const update = () => {
      const items = [...storage.items];
      for (let i = 0; i < items.length; i++) {
        if (items[i].x < -50) {
          items[i].x = storage.windowWidth;
          // items[i].ax *= airResistant;
          // items[i].dx *= -airResistant;
        }

        if (items[i].x > storage.windowWidth) {
          items[i].x = -50;
          // items[i].ax *= airResistant;
          // items[i].dx *= -airResistant;
        }

        if (items[i].y < -20) {
          items[i].y = storage.windowHeight;
          // items[i].ay *= airResistant;
          // items[i].dy *= -airResistant;
        }

        if (items[i].y > storage.windowHeight) {
          items[i].y = -20;
          // items[i].ay *= airResistant;
          // items[i].dy *= -airResistant;
        }

        items[i].rotation = clamp(items[i].rotation, 180);

        // resistant
        items[i].ax *= airResistant;
        items[i].ay *= airResistant;

        items[i].dx *= airResistant;
        items[i].dy *= airResistant;
        // items[i].dr *= airResistant;

        items[i].dx += Math.abs(items[i].ax) < maxAcc ? items[i].ax : maxAcc;
        items[i].dy += Math.abs(items[i].ay) < maxAcc ? items[i].ay : maxAcc;

        items[i].x +=
          Math.abs(items[i].dx) > minSpeed
            ? items[i].dx
            : items[i].dx < 0
            ? -minSpeed
            : minSpeed;
        items[i].y +=
          Math.abs(items[i].dy) > minSpeed
            ? items[i].dy
            : items[i].dy < 0
            ? -minSpeed
            : minSpeed;

        items[i].rotation +=
          Math.abs(items[i].dr) > minSpeed ? items[i].dr : minSpeed;
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
          -step * storage.windowWidth * 10
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
                className="absolute aspect-square bg-primary w-10 h-10 roudned-full overflow-hidden"
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
      <div className="w-screen h-screen top-0 left-0 absolute backdrop-blur-md backdrop-brightness-50" />
    </div>
  );
});
