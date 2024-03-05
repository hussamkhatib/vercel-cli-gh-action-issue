import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

export default function Home({ email }: { email: string }) {
  return (
    <div>
      <h1>EMAIL:, {email}!</h1>
      <h1>PUBLIC EMAIL: {process.env.NEXT_PUBLIC_EMAIL}</h1>
    </div>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {
      email: process.env.EMAIL,
    },
  };
};
