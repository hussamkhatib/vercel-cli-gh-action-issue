import { trpc } from "vc-trpc/utils/trpc";

export default function Home() {
  const usersQuery = trpc.getUsers.useQuery();

  if (usersQuery.error) {
    return <div>Error: {usersQuery.error.message}</div>;
  }

  if (usersQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const isEmpty = usersQuery.data.length === 0;

  return (
    <main className="p-4 w-full mx-auto max-w-3xl ">
      <h1 className="text-2xl font-bold text-primary mb-4 underline">Users </h1>
      {isEmpty && <p className="text-gray-600">No users found</p>}
      {!isEmpty && (
        <ul className="list-disc pl-5">
          {usersQuery.data.map((user) => (
            <li key={user.id} className="mb-2">
              <span className="font-semibold">{user.name}</span> (
              <span className="text-gray-600">{user.email}</span>) -{" "}
              <span className="text-gray-600">{user._count.posts} posts</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
