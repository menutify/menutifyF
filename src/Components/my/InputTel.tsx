import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

function InputTel({ form, name, className = '' }) {
  function formatPhoneNumber(value: string) {
    const cleaned = value.replace(/\D/g, '') // Quita caracteres no numéricos
    const match = cleaned.match(/^(\d{1,3})(\d{1,3})?(\d{1,4})?$/)

    if (match) {
      const part1 = match[1] || ''
      const part2 = match[2] ? ` ${match[2]}` : ''
      const part3 = match[3] ? `-${match[3]}` : ''
      const text = `${part1}${part2}${part3}`
      console.log(text.length)
      return text //esto es lo que se muestra en el input
    }

    // return value
    return value.slice(0, -1)
  }
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormControl>
            <Input
              {...field}
              type='tel'
              placeholder='123 456-7890'
              value={field.value}
              onChange={(e) =>
                field.onChange(formatPhoneNumber(e.target.value))
              }
              className='bg-bg_input border-border_input_color w-full'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default InputTel
