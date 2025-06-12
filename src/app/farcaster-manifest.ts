import { getBaseUrl } from "@/lib/constants";
import { type domainManifestSchema } from "@farcaster/frame-sdk";
import { type z } from "zod";

type Manifest = z.input<typeof domainManifestSchema>;

const appUrl = getBaseUrl();

// Docs
// https://miniapps.farcaster.xyz/docs/guides/publishing#host-a-manifest-file
export const farcasterManifest: Manifest = {
  accountAssociation: {
    header:
      "eyJmaWQiOjEzNDA0LCJ0eXBlIjoiY3VzdG9keSIsImtleSI6IjB4N0RCNjAxRTUyQ0VmMDAxNjVlZWUyMGVhNEZEY0E0NkMwNTE4MzY4OCJ9",
    payload: "eyJkb21haW4iOiJmYXJjYXN0ZXItdGVtcGxhdGUudmVyY2VsLmFwcCJ9",
    signature:
      "MHhjZGM2MWQ5NTRiYzEwY2JlZDJhMTBkMmJiMTg2MDBhMzM3ZDI0Y2YzMTBlZmQ1MGMxYjY4YmFjNDZlNTA4ZjAyNTQwNjMxMjc4YWRjMmI3NzRiMDhjMDQ5Mjg1OTYyNTg2YWU5ZWI3OTY0NTkyZjY0Nzk2NjkyY2Q0ZDAwNWMxZTFi",
  },
  frame: {
    version: "1",
    name: "Example Frame",
    iconUrl: `${appUrl}/icon.png`,
    homeUrl: `${appUrl}/farcaster`,
    imageUrl: `${appUrl}/image.png`,
    buttonTitle: "Check this out",
    splashImageUrl: `${appUrl}/splash.png`,
    splashBackgroundColor: "#eeccff",
    webhookUrl: `${appUrl}/api/webhook`,
    subtitle: "Test your Farcaster mini app",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    screenshotUrls: [
      `${appUrl}/screen-home.png`,
      `${appUrl}/screen-club.png`,
      `${appUrl}/screen-animation.png`,
    ],
    heroImageUrl: `${appUrl}/hero.png`,
    tagline: "Test your Farcaster mini app",
    ogTitle: "Farcaster Mini App Example",
    ogDescription:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt",
    ogImageUrl: `${appUrl}/og-image.png`,
    noindex: false,
  },
};
