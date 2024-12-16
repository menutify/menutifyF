import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Checkbox } from '../ui/checkbox'

function FormFieldCheckbox({ form, name = '', className = '', value = '' }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col py-2'>
          <div className='flex flex-row items-start space-x-3 space-y-1'>
            <FormControl>
              <Checkbox
                style={{ color: name === 'star' ? '#000' : 'auto' }}
                className={`${className}`}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className='space-y-1 leading-none'>
              {name === 'star' ? (
                <FormLabel className='text-[#777]'>{value}</FormLabel>
              ) : (
                <FormLabel className='text-[#777]'>
                  Acepto los <a href='#'>terminos y condiciones</a>
                </FormLabel>
              )}
            </div>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormFieldCheckbox
