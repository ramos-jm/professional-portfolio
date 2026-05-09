import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/about')({
  loader: () => {
    if (typeof window !== 'undefined') {
      window.location.replace('/#about')
    }
  },
  component: () => null,
})
