import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

function useFormHook(scheme, defaultValues) {
  const form = useForm<z.infer<typeof scheme>>({
    resolver: zodResolver(scheme),
    defaultValues
  })
  return form
}

export default useFormHook
