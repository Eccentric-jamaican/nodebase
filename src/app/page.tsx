import prisma from "@/lib/db"

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black text-red-500 text-4xl font-bold">
    <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
