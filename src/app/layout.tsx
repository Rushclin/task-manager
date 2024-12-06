import type { Metadata } from "next";
import "@/styles/globals.css";
import { TaskProvider } from "@/context/TaskProvider";

export const metadata: Metadata = {
  title: "Task Manager, By Rushclin Takam",
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="container">
        <TaskProvider>
          {children}
        </TaskProvider>
      </body>
    </html>
  );
}
