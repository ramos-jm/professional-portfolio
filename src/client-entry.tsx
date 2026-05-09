import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";

async function bootstrap() {
  const router = getRouter();

  const rootEl = document.getElementById("root");
  if (!rootEl) return;

  const root = createRoot(rootEl);
  root.render(<RouterProvider router={router} />);
}

bootstrap();
