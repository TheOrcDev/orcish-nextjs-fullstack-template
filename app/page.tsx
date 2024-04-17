"use client";

import { trpc } from "@/server/client";

export default function Home() {
  const users = trpc.users.get.useQuery();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(users.data)}
    </main>
  );
}
