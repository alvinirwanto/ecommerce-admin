import prismadb from "@/lib/prismadb"

interface DashboardPagesProps {
  params: { storeId: string }
}

export default async function page({ params }: DashboardPagesProps) {

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  })
  return (
    <div>This is a Dashboard {store?.name}</div>
  )
}
