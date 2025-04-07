import { createUrl } from "@/lib/url";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Mybutton } from "../../Button/Mybutton";

enum ProjectStatus {
  EN_COURS = "EN_COURS",
  TERMINE = "TERMINE",
  EN_ATTENTE = "EN_ATTENTE",
  ANNULER = "ANNULER"
}

enum ProjectType {
  CTP = "CTP",
  CTF = "CTF"
}

const SearchBar = ({ onCreateProject }: { onCreateProject: () => void }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '')
  const [startDate, setStartDate] = useState(searchParams.get('startDate') || '')
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || '')
  const [status, setStatus] = useState(searchParams.get('status') || '')
  const [type, setType] = useState(searchParams.get('type') || '')

  useEffect(() => {
    // Sync input fields with URL on mount or URL change
    setSearchValue(searchParams.get("search") || "");
    setStartDate(searchParams.get("startDate") || "");
    setEndDate(searchParams.get("endDate") || "");
    setStatus(searchParams.get("status") || "");
    setType(searchParams.get("type") || "");
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((
    term: string,
    newStartDate: string = startDate,
    newEndDate: string = endDate,
    newStatus: string = status,
    newType: string = type,
  ) => {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }

    if (newStartDate) {
      params.set('startDate', newStartDate)
    } else {
      params.delete('startDate')
    }

    if (newEndDate) {
      params.set('endDate', newEndDate)
    } else {
      params.delete('endDate')
    }

    if (newStatus) {
      params.set('status', newStatus)
    }
    else {
      params.delete('status')
    }

    if (newType) {
      params.set('type', newType)
    } else {
      params.delete('type')
    }

    params.set('page', '1') // Reset to first page on new search
    router.push(createUrl(pathname, params))
  }, 300)

  const handleClear = () => {
    setSearchValue('')
    setStartDate('')
    setEndDate('')
    setStatus('')
    setType('')
    router.push(pathname)
  }

  const hasFilters = searchValue || startDate || endDate || status || type

  return (
    <div className="p-4 mb-1">
      <div className="flex justify-between items-center mb-1">
        <div className="flex justify-start items-center rounded-lg mt-2 relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Rechercher un projet..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
              handleSearch(e.target.value, startDate, endDate, status, type)
            }}
            className="w-full p-2 pl-10 border rounded-lg shadow-sm focus:outline-none border-blue-400 focus:ring-2 focus:ring-blue-500"
          />
          {hasFilters && (
            <button
              onClick={handleClear}
              className="h-9 w-9 ml-2"
              title="Clear filters"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Mybutton text="Ajouter un projet" onClick={onCreateProject} />
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap gap-4 mt-4">
        {/* Date filters */}
        <div className="flex gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value)
              handleSearch(searchValue, e.target.value, endDate, status, type)
            }}
            className="p-2 border rounded-lg shadow-sm focus:outline-none border-blue-400 focus:ring-2 focus:ring-blue-500"
          />
          <span className="flex items-center">à</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value)
              handleSearch(searchValue, startDate, e.target.value, status, type)
            }}
            className="p-2 border rounded-lg shadow-sm focus:outline-none border-blue-400 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status filter */}
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value)
            handleSearch(searchValue, startDate, endDate, e.target.value, type)
          }}
          className="p-2 border rounded-lg shadow-sm focus:outline-none border-blue-400 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Statuts</option>
          {Object.values(ProjectStatus).map((statusValue) => (
            <option key={statusValue} value={statusValue}>
              {statusValue.replace('_', ' ')}
            </option>
          ))}
        </select>

        {/* Type filter */}
        <select

          value={type}
          onChange={(e) => {
            setType(e.target.value)
            handleSearch(searchValue, startDate, endDate, status, e.target.value)
          }}
          className="p-2 border rounded-lg shadow-sm focus:outline-none border-blue-400 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Types</option>
          {Object.values(ProjectType).map((typeValue) => (
            <option key={typeValue} value={typeValue}>
              {typeValue}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchBar;