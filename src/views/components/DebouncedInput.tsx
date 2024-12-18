import React, { useEffect, useState, ChangeEvent } from 'react'

interface DebouncedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
}

const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState<string | number>(initialValue)

  // Değer güncelleme
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  // Debounce mantığı
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, onChange, debounce])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <input
      {...props}
      value={value}
      onChange={handleInputChange} // Değeri state'e set eder
      style={{
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        width: '200px',
        ...props.style // Ek stil varsa
      }}
    />
  )
}

export default DebouncedInput
