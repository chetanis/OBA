import { Phone } from "lucide-react";
import DeletePhone from "./ModefierClient/DeletePhone";

interface PhoneListProps {
  telephones: { id: number; number: string }[];
  onDeletePhone: (id: number) => void; // Prop pour supprimer un téléphone
}

export default function PhoneList({ telephones, onDeletePhone }: PhoneListProps) {
  if (!Array.isArray(telephones) || telephones.length === 0) {
    return null;
  }

  return (
    <div className="divide-y divide-gray-300 text-sm">
      {telephones.map((tel) => (
        <div key={tel.id} className="grid grid-cols-4 py-2 items-center">
          <div>
            <Phone className="text-blue-500" size={20} />
          </div>
          <div className="text-red-900 font-semibold text-right flex justify-start">
            {tel.number}
          </div>
          <div className="flex justify-center items-center gap-2">
            {/* On passe onDeletePhone au composant DeletePhone */}
            <DeletePhone phone={tel.number} id={tel.id} onDelete={onDeletePhone} />
          </div>
        </div>
      ))}
    </div>
  );
}
