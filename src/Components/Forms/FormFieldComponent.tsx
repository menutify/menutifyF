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
  title = '',
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
              className='h-10 text-base bg-bg_input border-border_input_color placeholder:text-base'
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
