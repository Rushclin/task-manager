import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@/styles/globals.css";
import { TaskProvider } from "@/context/TaskProvider";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Task Manager, By Rushclin Takam",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="container m-5 border">
        <Suspense fallback={<Loading />}>
          <TaskProvider>
            <ToastContainer position="top-right" autoClose={3000} />
            {children}
          </TaskProvider>
        </Suspense>
      </body>
    </html>
  );
}
