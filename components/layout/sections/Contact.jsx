import { TransitionScroll } from 'react-transition-scroll';
import { baseStyle, hiddenStyle } from '@/lib/utils';

const Contact = () => {
  return (
    <>
      <TransitionScroll baseStyle={baseStyle} hiddenStyle={hiddenStyle}>
        <h2 id="contact" className="scroll-header-offset mt-5 text-center text-4xl font-bold sm:text-left">
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
          <div className="relative">
            <input
              placeholder="Name"
              name="name"
              id="name"
              className="inputAnimation peer h-12 w-full p-2 indent-12"
              required
            />
            <label htmlFor="name" className="labelAnimation">
              Name
            </label>
          </div>

          <div className="relative row-span-2">
            <textarea
              placeholder="Message"
              name="message"
              id="message"
              className="inputAnimation peer max-h-96 min-h-[100%] w-full p-2 py-3 indent-[4.25em]"
              required
            />
            <label htmlFor="message" className="labelAnimation">
              Message
            </label>
          </div>

          <div className="relative order-first sm:order-none">
            <input
              placeholder="Email"
              name="email"
              id="email"
              className="inputAnimation peer mt-auto h-12 w-full p-2 indent-12"
              required
            />
            <label htmlFor="email" className="labelAnimation">
              Email
            </label>
          </div>

          <button className={`button button-green col-span-full mx-auto h-12 w-full sm:w-auto`} type="submit">
            Send
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
    </>
  );
};

export default Contact;
