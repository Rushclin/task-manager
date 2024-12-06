import type { Metadata } from "next";
import "@/styles/globals.css";
import { TaskProvider } from "@/context/TaskProvider";

export const metadata: Metadata = {
  title: "Task Manager, By Rushclin Takam",
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon.png',
    },
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
