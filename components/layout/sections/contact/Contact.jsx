import { baseStyle, hiddenStyle } from '@/lib/utils';
import TransitionScroll from '@/components/transitionScroll/TransitionScroll';
import FormInput from '@/components/common/FormInput';

const Contact = ({}) => {
  return (
    <section className="w-full">
      <TransitionScroll
        baseStyle={{ ...baseStyle, transitionDuration: '1s' }}
        hiddenStyle={{ ...hiddenStyle, transform: 'none' }}
      >
        <h2 id="contact" className="mt-5 text-center text-4xl font-bold sm:text-left">
          Contact me
        </h2>
      </TransitionScroll>
      <TransitionScroll baseStyle={baseStyle} hiddenStyle={hiddenStyle}>
        <h3 className="mb-6 text-2xl">Send me a message!</h3>
        <form
          className="grid grid-cols-1 grid-rows-4 gap-6 text-neutral-700 sm:grid-cols-2 sm:grid-rows-3"
          name="contact"
          method="POST"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="contact" />
          <FormInput input={<input id="name" className="h-12 w-full p-2" />} />
          <FormInput
            input={<textarea id="message" className="max-h-96 min-h-[100%] w-full p-2 py-3" />}
            className="row-span-2"
          />
          <FormInput
            input={<input id="email" className="mt-auto h-12 w-full p-2" />}
            className="order-first sm:order-none"
          />

          <button
            className="button button-green col-span-full mx-auto w-full place-self-center sm:w-auto"
            type="submit"
          >
            <span>Send</span>
          </button>
        </form>
      </TransitionScroll>
      <div>
        <TransitionScroll className="mb-2 mt-4" baseStyle={baseStyle} hiddenStyle={hiddenStyle}>
          <h3 className="font-semibold">
            Or, Email me directly! @{' '}
            <a
              style={{ wordBreak: 'break-word' }}
              className="font-bold text-blue-500 underline"
              href="mailto:janwillemvanbremen@live.nl"
            >
              janwillemvanbremen@live.nl
            </a>
          </h3>
        </TransitionScroll>
      </div>
    </section>
  );
};

export default Contact;
