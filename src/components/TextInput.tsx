type TextInputProps = {
    id: string,
    name: string,
    value: string,
    handleChange: any,
    type:string,
    label: string
}

export const TextInput = ({value, handleChange, label, name, id, type="text"}: TextInputProps) => {
    return(
        <div className="mb-8">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </label>
        </div>
        <div className="mt-2">
            <input
                value={value} onChange={handleChange}
                id={id}
                name={name}
                type={type}
                required
                className="block w-full rounded-md border-0 p-1.5 text-secondary shadow-sm ring-1 ring-background placeholder:text-background sm:text-sm sm:leading-6"
            />
        </div>
      </div>
        
    )
}