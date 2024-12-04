import { currentUser } from "@clerk/nextjs/server";
import { PageComponent } from "./page-component";

export default async function Page() {
  const user = await currentUser();

  return (
    <PageComponent isSigned={!!user} />
  )
}