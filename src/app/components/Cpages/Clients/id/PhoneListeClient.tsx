import { Phone } from "lucide-react"
import DeletePhone from "./ModefierClient/DeletePhone"

interface PhoneListProps {
  telephones: { id: number; number: string }[]
  onDeletePhone: (id: number) => void // Prop pour supprimer un téléphone
}

export default function PhoneList({ telephones, onDeletePhone }: PhoneListProps) {
  if (!Array.isArray(telephones) || telephones.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg">Aucun numéro de téléphone enregistré</div>
    )
  }

  return (
    <div className="divide-y divide-gray-200">
      {telephones.map((tel) => (
        <div key={tel.id} className="grid grid-cols-12 py-3 items-center">
          <div className="col-span-1">
            <span className="p-1.5 bg-blue-50 rounded-md inline-flex">
              <Phone className="text-blue-500" size={18} />
            </span>
          </div>
          <div className="col-span-9 text-gray-900 font-medium text-sm">{tel.number}</div>
          <div className="col-span-2 flex justify-end">
            <DeletePhone phone={tel.number} id={tel.id} onDelete={onDeletePhone} />
          </div>
        </div>
      ))}
    </div>
  )
}
