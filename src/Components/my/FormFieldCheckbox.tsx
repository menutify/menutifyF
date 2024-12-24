import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Checkbox } from '../ui/checkbox'
import Anchor2 from './Anchor2'

function FormFieldCheckbox({ form, name = '', className = '', value = '' }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col mt-[5px] mb-[15px] '>
          <div className='flex flex-row items-start gap-3'>
            <FormControl>
              <Checkbox
                style={{ color: name === 'star' ? '#000' : 'auto' }}
                className={`h-5 w-5 flex-complete p-0 ${className}`}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className='space-y-1 leading-none'>
              {name === 'star' ? (
                <FormLabel className='text-white'>{value}</FormLabel>
              ) : (
                <FormLabel className='text-white text-sm/6 flex-complete font-light h-5 '>
                  Acepto los&nbsp;
                  <Anchor2 className='font-light text-primary_color underline'>
                    términos y condiciones
                  </Anchor2>
                  &nbsp; de Menutify
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
