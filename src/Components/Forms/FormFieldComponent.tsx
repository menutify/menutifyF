import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'

function FormFieldComponent({
  form,
  title,
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
        <FormItem className={className}>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Input
              className='h-9 bg-input_c_1 border-input_c_2'
              placeholder={ph}
              {...field}
              type={type}
            />
          </FormControl>
          <FormDescription>{formDesc}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormFieldComponent
