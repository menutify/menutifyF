import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Checkbox } from '../ui/checkbox'

function FormFieldCheckbox({ form, name = '', className = '' }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col py-2'>
          <div className='flex flex-row items-start space-x-3 space-y-1'>
            <FormControl>
              <Checkbox
                style={{ color: '#000' }}
                className={`${className}`}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className='space-y-1 leading-none'>
              <FormLabel className='text-[#777]'>
                Acepto los <a href='#'>terminos y condiciones</a>
              </FormLabel>
            </div>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormFieldCheckbox
