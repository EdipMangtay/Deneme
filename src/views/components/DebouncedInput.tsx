// components/DebouncedInput.tsx

'use client'

// React Imports
import type { ChangeEvent } from 'react';
import React, { useEffect, useState } from 'react'

// MUI Imports
import type { TextFieldProps } from '@mui/material';
import { TextField } from '@mui/material'

// Tip Tanımlamaları
interface DebouncedInputProps extends Omit<TextFieldProps, 'onChange'> {
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

  // İlk değeri güncelle
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
    <TextField
      {...props}
      value={value}
      onChange={handleInputChange}
      variant="outlined"
    />
  )
}

export default DebouncedInput
