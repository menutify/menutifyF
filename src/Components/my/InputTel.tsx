import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'

function InputTel({
  form,
  name,
  className = '',
  bgstyle = 'bg-bg_input border-border_input_color focus:border-primary_color',
  title = ''
}) {
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
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type='tel'
              placeholder='123 456-7890'
              value={field.value}
              onChange={(e) =>
                field.onChange(formatPhoneNumber(e.target.value))
              }
              className={` w-full h-10 mt-2 flex md:text-sm/6 text-sm/6 placeholder:text-sm/6  ${bgstyle}`}
            />
          </FormControl>

          <FormMessage className='mt-0 pt-0' />
        </FormItem>
      )}
    />
  )
}

export default InputTel
