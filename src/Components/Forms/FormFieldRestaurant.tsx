import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import oeSVG from '@/assets/all/openeye.svg'
import ceSVG from '@/assets/all/closeeye.svg'
import { useState } from 'react'

function FormFieldRestaurant({
  form,
  title = '',
  ph,
  name,

  formDesc = '',
  type = 'text',
  className = ''
}) {
  const [seePass, setSeePass] = useState(false)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className + 'relative '}>
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
          <FormControl>
            {type == 'password' ? (
              <Input
                className='h-10 text-base  border-border_input_color placeholder:text-base '
                placeholder={ph}
                {...field}
                type={seePass ? 'text' : type}
              />
            ) : (
              <Input
                className='h-10 text-base  border-border_input_color placeholder:text-base'
                placeholder={ph}
                {...field}
                type={type}
              />
            )}
          </FormControl>
          <FormDescription>{formDesc}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormFieldRestaurant
