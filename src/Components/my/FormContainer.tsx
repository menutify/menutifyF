
import { Button } from '../../Components/ui/button'
import { Form } from '../ui/form'



function FormContainer({
  formOptions,
  error = {error:false,msg:''},
  isPending = false,
  textButton,
  functionSubmit,
  children
}) {
  return (
    <>
      <Form {...formOptions}>
        <form
          onSubmit={formOptions.handleSubmit(functionSubmit)}
          className='flex flex-col gap-3 w-full'
        >
          {children}
          <Button
            className='bg-primary_color '
            type='submit'
            disabled={isPending ? true : false}
          >
            {textButton}
          </Button>
        </form>
      </Form>
      {error.error && <p className='error'>{error.msg}</p>}
    </>
  )
}

export default FormContainer
