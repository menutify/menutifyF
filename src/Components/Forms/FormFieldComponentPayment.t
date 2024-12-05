import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormItemPayment,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { InputPayment } from '../ui/inputPayment'

function FormFieldComponentPayment({
  form,
  title='',
  ph,
  name,
  
  formDesc = '',
  type = 'text',
  className = ''
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItemPayment className={className}>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Input
              className='h-9 bg-white text-black'
              placeholder={ph}
              {...field}
              type={type}
             
            />
          </FormControl>
          <FormDescription>{formDesc}</FormDescription>
          <FormMessage />
        </FormItemPayment>
      )}
    />
  )
}

export default FormFieldComponentPayment
