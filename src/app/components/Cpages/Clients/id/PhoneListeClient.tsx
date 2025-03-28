import { Phone, Pencil, Trash2 } from "lucide-react";

interface PhoneListProps {
  telephones: { id: number; number: string }[];
}

export default function PhoneList({ telephones }: PhoneListProps) {
  if (!Array.isArray(telephones) || telephones.length === 0) {
    return null;
  }

  return (
    <div className="divide-y divide-gray-300 text-sm px-11 ">
      {telephones.map((tel) => (
        <div key={tel.id} className="grid grid-cols-4 py-2 items-center">
          <div>
            <Phone className="text-blue-500" size={20} />
          </div>
          <div className="text-red-900 font-semibold text-right flex justify-start">
            {tel.number}
          </div>
          <div className="flex justify-center items-center gap-2">
            <button className="text-gray-500 hover:text-blue-600">
              <Pencil size={16} />
            </button>
            <button className="text-gray-500 hover:text-red-600">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
