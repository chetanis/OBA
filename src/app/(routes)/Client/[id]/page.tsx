import TabsComponent from "@/app/components/Cpages/Clients/id/TabsComponent"
import PathName from "@/app/components/PathName/PathName"
import { getClientById } from "@/app/lib/actions/client"

const Page = async ({ params }: { params: any }) => {
  //await the params
  const { id } = await params

  const data = await getClientById(id)

  const paths = [
    { label: "Home", href: "/" },
    { label: "Clients", href: "/Client" },
    { label: "Liste des Clients", href: "/Client" },
    { label: String(data?.nom) },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <PathName paths={paths} showLine={false} />
      </div>

      {/* Passer les données au composant client */}
      <TabsComponent data={data} />
    </div>
  )
}

export default Page
