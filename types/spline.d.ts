import { DetailedHTMLProps, HTMLAttributes } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          url?: string;
          "loading-anim"?: boolean;
          "events-target"?: "global" | "local";
          hint?: boolean;
        },
        HTMLElement
      >;
    }
  }
}
