"use client";
import Page from "@/components/Page";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const onMount = () => {
    router.push("/home");
  };

  return <Page title="Loading" onMount={onMount}></Page>;
};

export default Home;
