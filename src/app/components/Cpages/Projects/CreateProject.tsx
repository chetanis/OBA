'use client'

import { getClientsNames } from '@/app/lib/actions/client';
import { createProject } from '@/app/lib/actions/project';
import { ProjectFormData, projectSchema } from '@/types/project';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react'; // Add useEffect
import { useForm } from 'react-hook-form';
import { Mybutton } from '../../Button/Mybutton';
import ClientSelect from './ClientSelect';

type Client = {
    id: number;
    nom: string
}

const CreateProject = ({ onCancel, clientId }: { onCancel: () => void, clientId?: number }) => {
    const [projectType, setProjectType] = useState<'CTP' | 'CTF'>('CTP');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [taches, setTaches] = useState<{ nbPlaque_Film: number }[]>([]);
    const [clients, setClients] = useState<Client[]>([]); // State for clients list
    const [searchTerm, setSearchTerm] = useState(''); // State for client search
    const [isLoadingClients, setIsLoadingClients] = useState(false); // Loading state

    const { control, register, handleSubmit, formState: { errors }, watch, setValue, resetField } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            type: 'CTP',
            additionalFees: 0,
            nbTaches: 1,
            clientId: clientId,
        }
    });

    // Fetch clients when component mounts (only if no clientId provided)
    useEffect(() => {
        if (!clientId) {
            const fetchClients = async () => {
                setIsLoadingClients(true);
                try {
                    const fetchedClients = await getClientsNames();
                    setClients(fetchedClients || []);
                } catch (error) {
                    console.error('Failed to fetch clients:', error);
                    setErrorMessage('Failed to load clients');
                } finally {
                    setIsLoadingClients(false);
                }
            };
            fetchClients();
        }
    }, [clientId]);

    const handleTypeChange = (type: 'CTP' | 'CTF') => {
        setProjectType(type);
        setValue('type', type);
        resetField('typePlaque');
        resetField('dimension_x');
        resetField('dimension_y');
    };

    const calculateExpectedPrice = () => {
        const nbPlaqueFilm = watch('nbPlaque_Film');
        const unitPrice = watch('unitPrice');

        if (projectType === 'CTP') {
            return (nbPlaqueFilm * unitPrice) || 0;
        } else {
            const x = watch('dimension_x') || 0;
            const y = watch('dimension_y') || 0;
            return (nbPlaqueFilm * x * y * unitPrice) || 0;
        }
    };

    const addTache = () => {
        setTaches([...taches, { nbPlaque_Film: 1 }]);
    };

    const removeTache = (index: number) => {
        const newTaches = [...taches];
        newTaches.splice(index, 1);
        setTaches(newTaches);
    };

    // Filter clients based on search term
    const filteredClients = clients.filter(client =>
        client.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const submitHandler = async (data: ProjectFormData) => {
        try {
            // Calculate final price
            data.expectedPrice = calculateExpectedPrice() || 0;
            data.finalPrice = data.expectedPrice + (data.additionalFees || 0);

            if (taches.length > 0) {
                data.taches = taches;
            }

            const { success, error } = await createProject(data)
            if (success) {
                setSuccessMessage('Projet créé avec succès!');
                setErrorMessage('');
            } else {
                setErrorMessage(error!);
                setSuccessMessage('');
            }

        } catch (error) {
            setErrorMessage('Erreur lors de la création du projet');
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <div className='flex justify-between items-center mb-1'>
                <h2 className="flex justify-start items-center rounded-lg mt-2 relative text-2xl font-bold ml-4 mb-6 text-blue-900">Créer un Projet</h2>
                <Mybutton className='mr-10' text="Annuler" onClick={onCancel} />
            </div>
            <form onSubmit={handleSubmit(submitHandler)} className="mt-4 px-11">
                {/* Client selection */}
                <div >
                    {clientId ?
                        null : (
                            <ClientSelect
                                control={control}
                                errors={errors}
                                isLoadingClients={isLoadingClients}
                                clients={clients} />
                        )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-11">
                    {/* Basic info */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom du projet</label>
                        <input
                            {...register('nom')}
                            placeholder="Nom du projet"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                        <input
                            {...register('note')}
                            placeholder="Note optionnelle"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.note && <p className="mt-1 text-sm text-red-600">{errors.note.message}</p>}
                    </div>

                    {/* Project type selection */}
                    <div className="md:col-span-2 mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type de projet</label>
                        <div className="flex space-x-4">
                            <button
                                type="button"
                                className={`px-4 py-2 rounded-lg ${projectType === 'CTP' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => handleTypeChange('CTP')}
                            >
                                CTP
                            </button>
                            <button
                                type="button"
                                className={`px-4 py-2 rounded-lg ${projectType === 'CTF' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => handleTypeChange('CTF')}
                            >
                                CTF
                            </button>
                        </div>
                    </div>

                    {/* Conditional fields based on project type */}
                    {projectType === 'CTP' ? (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type de plaque</label>
                            <select
                                {...register('typePlaque')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Sélectionner un type</option>
                                <option value="SM74">SM74</option>
                                <option value="SM72">SM72</option>
                                <option value="GTO">GTO</option>
                                <option value="MO">MO</option>
                            </select>
                            {errors.typePlaque && <p className="mt-1 text-sm text-red-600">{errors.typePlaque.message}</p>}
                        </div>
                    ) : (
                        <>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Dimension X</label>
                                <input
                                    {...register('dimension_x', { valueAsNumber: true })}
                                    type="number"
                                    placeholder="Dimension X"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.dimension_x && <p className="mt-1 text-sm text-red-600">{errors.dimension_x.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Dimension Y</label>
                                <input
                                    {...register('dimension_y', { valueAsNumber: true })}
                                    type="number"
                                    placeholder="Dimension Y"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                                {errors.dimension_y && <p className="mt-1 text-sm text-red-600">{errors.dimension_y.message}</p>}
                            </div>
                        </>
                    )}

                    {/* Common fields */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre de {projectType === 'CTP' ? 'plaques' : 'films'}
                        </label>
                        <input
                            {...register('nbPlaque_Film', { valueAsNumber: true })}
                            type="number"
                            placeholder={`Nombre de ${projectType === 'CTP' ? 'plaques' : 'films'}`}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.nbPlaque_Film && <p className="mt-1 text-sm text-red-600">{errors.nbPlaque_Film.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prix unitaire</label>
                        <input
                            {...register('unitPrice', { valueAsNumber: true })}
                            type="number"
                            step="0.01"
                            placeholder="Prix unitaire"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.unitPrice && <p className="mt-1 text-sm text-red-600">{errors.unitPrice.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prix attendu</label>
                        <input
                            {...register('expectedPrice', { valueAsNumber: true })}
                            type="number"
                            step="0.01"
                            placeholder="Prix attendu"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                            value={calculateExpectedPrice()}
                            readOnly
                        />
                        {errors.expectedPrice && <p className="mt-1 text-sm text-red-600">{errors.expectedPrice.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Frais supplémentaires (offre si négatif)</label>
                        <input
                            {...register('additionalFees', { valueAsNumber: true })}
                            type="number"
                            step="0.01"
                            placeholder="Frais supplémentaires"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.additionalFees && <p className="mt-1 text-sm text-red-600">{errors.additionalFees.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prix final</label>
                        <input
                            {...register('finalPrice', { valueAsNumber: true })}
                            type="number"
                            step="0.01"
                            placeholder="Prix final"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                            value={calculateExpectedPrice() + (watch('additionalFees') || 0)}
                            readOnly
                        />
                        {errors.finalPrice && <p className="mt-1 text-sm text-red-600">{errors.finalPrice.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de tâches</label>
                        <input
                            {...register('nbTaches', { valueAsNumber: true })}
                            type="number"
                            placeholder="Nombre de tâches"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.nbTaches && <p className="mt-1 text-sm text-red-600">{errors.nbTaches.message}</p>}
                    </div>

                    {/* Image upload */}
                    <div className="md:col-span-2 mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image du projet</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setValue('img', e.target.files?.[0])}
                            className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                        />
                        {errors.img && <p className="mt-1 text-sm text-red-600">{errors.img.message}</p>}
                    </div>

                    {/* Tâches */}
                    <div className="md:col-span-2 mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tâches</label>
                        <button
                            type="button"
                            onClick={addTache}
                            className="mb-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Ajouter une tâche
                        </button>

                        {taches.map((tache, index) => (
                            <div key={index} className="flex items-center gap-4 mb-2">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombre de plaques pour la tâche {index + 1}
                                    </label>
                                    <input
                                        type="number"
                                        value={tache.nbPlaque_Film}
                                        onChange={(e) => {
                                            const newTaches = [...taches];
                                            newTaches[index].nbPlaque_Film = parseInt(e.target.value) || 0;
                                            setTaches(newTaches);
                                        }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeTache(index)}
                                    className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 mt-5"
                                >
                                    Supprimer
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Success and error messages */}
                {successMessage && (
                    <div className="p-3 mb-4 text-green-800 bg-green-200 border border-green-400 rounded-lg mt-6">
                        {successMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="p-3 mb-4 text-red-800 bg-red-200 border border-red-400 rounded-lg mt-6">
                        {errorMessage}
                    </div>
                )}

                {/* Submit button */}
                <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-6">
                    Créer Projet
                </button>
            </form>
        </div>
    );
};

export default CreateProject;

