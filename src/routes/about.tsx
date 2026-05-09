import { createFileRoute } from "@tanstack/react-router";
import { BASE_PATH } from "@/lib/base-path";

export const Route = createFileRoute('/about')({
  loader: () => {
    if (typeof window !== 'undefined') {
      window.location.replace(`${BASE_PATH}/#about`)
    }
  },
  component: () => null,
})
