import Heading from '@/components/Heading'
import Paragraph from '@/components/Paragraph'
import { useForm } from '@formspree/react'

const ContactForm = () => {
  const [state, handleSubmit] = useForm('xjvnvvkp')

  if (state.succeeded) {
    return (
      <div className="mt-24 flex flex-col items-center">
        <Heading as="h2">Thanks for joining!</Heading>
        <Paragraph className="mt-6">
          We will contact you as soon as possible.
        </Paragraph>
      </div>
    )
  }

  return (
    <>
      <Heading as="h2" color="black" className="mt-12 text-center">
        Download our premium investment software
      </Heading>
      <Paragraph className="mx-auto mt-6 max-w-md text-center">
        If you are interested in our premium software version please contact us,
        we will let you know how to download it.
      </Paragraph>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-12 flex max-w-lg flex-col"
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email Address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="hello@stockcomparator.com"
              required
              className="block w-full rounded border-gray-200 text-sm shadow-sm focus:border-gray-800 focus:ring-gray-800"
            />
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <div className="mt-1">
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              rows={6}
              required
              className="block w-full rounded border-gray-200 text-sm shadow-sm focus:border-gray-800 focus:ring-gray-800"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={state.submitting}
            className="w-full rounded border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out hover:bg-gray-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default ContactForm
