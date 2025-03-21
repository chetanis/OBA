
interface MyInputProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  setp?: string
  form: any; // Objet React Hook Form
}

function MyInput({ label, name, type = "text", placeholder, form, setp='1' }: MyInputProps) {
  return (
    <div>
      <label className="block text-gray-700">{label}</label>

      <input
        type={type}
        step={setp}
        placeholder={placeholder}
        className="p-2 border rounded-lg shadow-sm focus:outline-none border-blue-200 focus:ring-2 focus:ring-blue-500 bg-gray-50 w-full"
        {...form.register(name, type === "number" ? { valueAsNumber: true } : {})}
      />

      {form.formState.errors[name] && (
        <p className="text-sm text-red-500 mt-1">{form.formState.errors[name]?.message as string}</p>
      )}
    </div>
  );
}

export default MyInput;
