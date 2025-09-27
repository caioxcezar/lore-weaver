"use client";
import Page from "@/components/Page";
import { useRouter } from "next/navigation";

const Home = () => {
  const route = useRouter();
  const onMount = () => route.push("/home");
  return <Page title="Loading" onMount={onMount} authorize></Page>;
};

export default Home;
