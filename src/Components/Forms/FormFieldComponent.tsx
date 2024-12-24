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

function FormFieldComponent({
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
          <FormLabel className='font-normal tracking-wider text-sm/6'>
            {title}
          </FormLabel>
          {type == 'password' ? (
            <></>
          ) : (
            <></>
          )}
          <FormControl>
            {type == 'password' ? (
              <div>
                <Input
                  className='h-10 text-base bg-bg_input border-border_input_color placeholder:text-base md:text-sm/6 placeholder:md:text-sm/6 placeholder:text-[#41444f] focus:border-primary_color'
                  placeholder={ph}
                  {...field}
                  type={seePass ? 'text' : type}
                />
                <span
                  onClick={() => setSeePass(!seePass)}
                  className='absolute block w-5 h-5 rounded-full right-2 top-[42px]'
                >
                  <img className='' src={seePass ? oeSVG : ceSVG} alt='' />
                </span>
              </div>
            ) : (
              <Input
                className='h-10 text-base bg-bg_input border-border_input_color placeholder:text-base md:text-sm/6 placeholder:md:text-sm/6 placeholder:text-[#41444f] focus:border-primary_color'
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

export default FormFieldComponent
