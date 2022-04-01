import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const aprilFools = {
  month: 3,
  date: 1,
};

function isItAprilFoolDay() {
  const now = new Date();
  return now.getMonth() == aprilFools.month && now.getDate() == aprilFools.date;
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isItAprilFoolDay()) {
      router.push("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    }
  }, []);

  return <Layout> <Component {...pageProps} /> </Layout>
}

export default MyApp
