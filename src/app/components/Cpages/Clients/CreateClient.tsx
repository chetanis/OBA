import MyInput from "@/app/components/Input/MyInput"; // Adjust the import path as needed
import { createClient } from "@/app/lib/actions/client"; // Adjust the import path as needed
import { ClientFormData, clientSchema } from "@/types/client"; // Adjust the import path as needed
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PathName from "../../PathName/PathName";

const CreateClientPage = () => {
    const form = useForm<ClientFormData>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            nom: "",
            nomCommercial: "",
            email: "",
            adresse: "",
            nrc: "",
            nif: "",
            ai: "",
            nis: "",
            plaquePrix: 0,
            filmPrix: 0,
            telephone: [],
        },
    });

    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (successMessage || errorMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
                setErrorMessage(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [successMessage, errorMessage]);

    const paths = [
        { label: "Home", href: "/" },
        { label: "Clients", href: "/Client" },
        { label: "Liste des Clients", href: "/Client" },
        { label: "Créer un Client" },
    ];

    const onSubmit = async (data: ClientFormData) => {
        setSuccessMessage(null);
        setErrorMessage(null);
        const formData = {
            ...data,
            plaquePrix: Number(data.plaquePrix),
            filmPrix: Number(data.filmPrix),
        };

        try {
            const result = await createClient(formData);

            if (result.success) {
                setSuccessMessage("Client créé avec succès !");
                form.reset();
            } else {
                setErrorMessage("Une erreur s'est produite lors de la création du client.");
            }
        } catch (error) {
            console.error("Form submission error:", error);

            if (Array.isArray(error)) {
                setErrorMessage(error.map((err) => err.message).join(", "));
            } else if (typeof error === "string") {
                setErrorMessage(error);
            } else {
                setErrorMessage("Une erreur inattendue s'est produite.");
            }
        }
    };

    return (
        <div className="p-6">
            <PathName paths={paths} />
            <h2 className="text-2xl font-bold mb-4">Créer un Client</h2>
            <h4 className="pl-4">Informations du client</h4>

            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 px-11">
                {/* Grid layout for form fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MyInput label="Nom du client" name="nom" placeholder="Nom du client" form={form} />
                    <MyInput label="Nom commercial" name="nomCommercial" placeholder="Nom commercial" form={form} />
                    <MyInput label="Email" name="email" placeholder="Email" form={form} />
                    <MyInput label="Adresse" name="adresse" placeholder="Adresse" form={form} />
                    <MyInput label="NRC" name="nrc" placeholder="NRC" form={form} />
                    <MyInput label="NIF" name="nif" placeholder="NIF" form={form} />
                    <MyInput label="AI" name="ai" placeholder="AI" form={form} />
                    <MyInput label="NIS" name="nis" placeholder="NIS" form={form} />
                    <MyInput label="Prix de la plaque" name="plaquePrix" type="number" placeholder="Prix de la plaque" form={form} />
                    <MyInput setp="0.01" label="Prix du film" name="filmPrix" type="number" placeholder="Prix du film" form={form} />
                </div>

                {/* Dynamic phone number fields */}
                <div className="mt-6">
                    <label className="block text-gray-700 mb-2">Téléphone(s)</label>
                    <div className="flex flex-wrap gap-4">
                        {form.watch("telephone")?.map((phone, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <MyInput
                                    name={`telephone.${index}.number`}
                                    placeholder="Numéro de téléphone"
                                    form={form}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const updatedPhones = (form.getValues("telephone") || []).filter((_, i) => i !== index);
                                        form.setValue("telephone", updatedPhones);
                                    }}
                                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            const updatedPhones = [...(form.getValues("telephone") || []), { number: "" }];
                            form.setValue("telephone", updatedPhones);
                        }}
                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mt-4"
                    >
                        Ajouter un numéro
                    </button>
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
                <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-6">
                    Créer Client
                </button>
            </form>
        </div>
    );
};

export default CreateClientPage;