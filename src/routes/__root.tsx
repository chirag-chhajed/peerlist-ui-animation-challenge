import { Outlet, createRootRoute, HeadContent } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />
      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} />
    </>
  ),
  head: () => ({
    meta: [
      // Primary Meta Tags
      {
        name: "title",
        content: "Peerlist UI Animation Challenge",
      },
      {
        name: "description",
        content: "Peerlist UI Animation Challenge",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      // Open Graph / Facebook
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: window.location.href,
      },
      {
        property: "og:title",
        content: "Peerlist UI Animation Challenge",
      },
      {
        property: "og:description",
        content: "Peerlist UI Animation Challenge",
      },
      {
        property: "og:image",
        content:
          "https://res.cloudinary.com/dz04dxsi9/image/upload/v1744904840/og_image_ogpxrf.png",
      },
      // Twitter
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:url",
        content: window.location.href,
      },
      {
        name: "twitter:title",
        content: "Peerlist UI Animation Challenge",
      },
      {
        name: "twitter:description",
        content: "Peerlist UI Animation Challenge",
      },
      {
        name: "twitter:image",
        content:
          "https://res.cloudinary.com/dz04dxsi9/image/upload/v1744904840/og_image_ogpxrf.png",
      },
    ],
  }),
});
