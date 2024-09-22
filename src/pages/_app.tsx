import type { AppProps } from 'next/app'
// import Image from "next/image";
// import localFont from "next/font/local";

import AuthContextProvider from '@/components/authContext'
import DashboardLayout from '@/components/layouts/dashboardLayout'
import '@/styles/globals.css'
import AuthLayout from '../components/layouts/authLayout'

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export default function App({ Component, pageProps }: AppProps) {
  // create a function/hook to provide current route
  // if dashboard, render dashboard layout
  const Layout = Component.Layout || AuthLayout

  const isDashboard = true
  return (
    <>
      <AuthContextProvider>
        {isDashboard ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <AuthLayout>
            <Component {...pageProps} />
          </AuthLayout>
        )}
      </AuthContextProvider>
    </>
  )
}
