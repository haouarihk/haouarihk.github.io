import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="icon"
        type="image/svg+xml"
        href="https://avatars.githubusercontent.com/u/57036855?s=400&u=d2750433460c2ac55a3d70fec28391677f5b41c9&v=4"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins&amp;display=swap"
        rel="stylesheet"
      />
      <meta content="Haouari Haitam Kouider" property="og:title" />
      <meta content="Professional Web Developer" property="og:description" />
      <meta content="https://haouarihk.com" property="og:url" />
      <meta content="/pfp2.webp" property="og:image" />
      <meta
        content="rgb(87, 13, 248)"
        data-react-helmet="true"
        name="theme-color"
      />
      {head.meta.map((m) => (
        <meta {...m} />
      ))}
      {head.links.map((l) => (
        <link {...l} />
      ))}
      {head.styles.map((s) => (
        <style {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
