import type { Metadata } from "next";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          <ToastContainer  position="top-right" autoClose={3000} />
          {children}
        </TaskProvider>
      </body>
    </html>
  );
}
