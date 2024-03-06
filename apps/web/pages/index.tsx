import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

export default function Home({
  email,
  vercelUrl,
}: {
  email: string;
  vercelUrl: string;
}) {
  return (
    <div>
      <h1>EMAIL:, {email}</h1>
      <h1>PUBLIC EMAIL: {process.env.NEXT_PUBLIC_EMAIL}</h1>
      <hr />
      <p>VERCEL_URL: {vercelUrl}</p>
      <p>NEXT_PUBLIC_VERCEL_URL: {process.env.NEXT_PUBLIC_VERCEL_URL}</p>
      <p>NEXT_PUBLIC_WEBAPP_URL: {process.env.NEXT_PUBLIC_WEBAPP_URL}</p>
    </div>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {
      email: process.env.EMAIL,
      vercelUrl: process.env.VERCEL_URL,
    },
  };
};
