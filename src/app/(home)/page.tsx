import { PageComponent } from "./page-component";

export default async function Page() {
  const user = true;

  return (
    <PageComponent isSigned={!!user} />
  )
}