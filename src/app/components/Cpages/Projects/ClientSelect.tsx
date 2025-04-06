// file: components/ClientSelect.tsx
import { Controller } from 'react-hook-form';
import Select from 'react-select';

type Client = {
    id: number;
    nom: string
}
type ClientSelectProps = {
    control: any;
    errors: any;
    isLoadingClients: boolean;
    clients: Client[];
}
const ClientSelect = ({ control, errors, isLoadingClients, clients }: ClientSelectProps) => {
    const clientOptions = clients.map(client => ({
        value: client.id,
        label: client.nom
    }));
    return (
        <div className="mb-4 w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
            {isLoadingClients ? (
                <p>Chargement des clients...</p>
            ) : (
                <Controller
                    name="clientId"
                    control={control}
                    rules={{ required: "Veuillez sélectionner un client" }}
                    render={({ field }) => {
                        const selectedOption = clientOptions.find(option => option.value === field.value)
                        return (
                            <Select
                                options={clientOptions}
                                placeholder="Rechercher un client..."
                                className="react-select-container"
                                classNamePrefix="react-select"
                                value={selectedOption || null}
                                onChange={(selected) => field.onChange(selected?.value)}
                            />
                        )
                    }}
                />
            )}
            {errors.clientId && (
                <p className="mt-1 text-sm text-red-600">{errors.clientId.message}</p>
            )}
        </div>
    )
}

export default ClientSelect;
