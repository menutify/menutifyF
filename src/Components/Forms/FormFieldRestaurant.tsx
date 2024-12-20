import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../Components/ui/form'
import { Input } from '../../Components/ui/input'
import oeSVG from '@/assets/all/openeye.svg'
import ceSVG from '@/assets/all/closeeye.svg'
import { useState } from 'react'
import { Textarea } from '../ui/textarea'
import { Select, SelectTrigger, SelectValue } from '../ui/select'

function FormFieldRestaurant({
  form,
  title = '',
  ph = '',
  name = '',
  children = <></>,
  formDesc = '',
  type = 'text',
  className = '',
  selectDisable = false,
  
}) {
  const [seePass, setSeePass] = useState(false)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={'relative ' + className}>
          <FormLabel>{title}</FormLabel>
          {type == 'password' ? (
            <span
              onClick={() => setSeePass(!seePass)}
              className='absolute block w-5 h-5 rounded-full right-2 top-0.5'
            >
              <img className='' src={seePass ? oeSVG : ceSVG} alt='' />
            </span>
          ) : (
            <></>
          )}
          <Select
            disabled={selectDisable}
            onValueChange={field.onChange}
            defaultValue={field.value || ''}
          >
            <FormControl>
              {type == 'password' ? (
                <Input
                  className='h-10 text-base  border-border_input_color placeholder:text-base '
                  placeholder={ph}
                  {...field}
                  type={seePass ? 'text' : type}
                />
              ) : type == 'textarea' ? (
                <Textarea
                  className='resize-none h-32 md:text-base border-border_input_color'
                  placeholder={ph}
                  {...field}
                />
              ) : type == 'select' ? (
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Selecciona una categoria' />
                </SelectTrigger>
              ) : (
                <Input
                  className='h-10 text-base  border-border_input_color placeholder:text-base'
                  placeholder={ph}
                  {...field}
                  type={type}
                  
                />
              )}
            </FormControl>
            {children}
          </Select>
          <FormDescription>{formDesc}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormFieldRestaurant
