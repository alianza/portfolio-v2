import { TransitionScroll } from 'react-transition-scroll';
import { baseStyle, capitalize, hiddenStyle } from '@/lib/utils';
import { cloneElement, useEffect, useRef, useState } from 'react';

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
          {FormInput(<input id="name" className="h-12 w-full p-2" />)}
          {FormInput(<textarea id="message" className="max-h-96 min-h-[100%] w-full p-2 py-3" />, 'row-span-2')}
          {FormInput(<input id="email" className="mt-auto h-12 w-full p-2" />, 'order-first sm:order-none')}
          <button className="button button-green col-span-full mx-auto h-12 w-full sm:w-auto" type="submit">
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

const FormInput = (input, className = '', required = true) => {
  const labelRef = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (labelRef.current && !labelWidth) setLabelWidth(labelRef.current.offsetWidth + 6); // Determine label width to set textIndent
  }, [labelWidth]);

  let { placeholder, id, name, className: inputClassNameProp } = input.props;

  if (!name) name = id;
  if (!placeholder) placeholder = capitalize(id);

  const newInput = cloneElement(input, {
    style,
    className: `inputAnimation peer ${inputClassNameProp}`,
    name,
    placeholder,
    id,
    required,
    onFocus: () => setStyle({ textIndent: '0' }),
    onBlur: () => setStyle({ textIndent: `${labelWidth}px` }),
  }); // Clone input element and add event listeners and props

  return (
    <div className={`relative ${className}`}>
      {newInput}
      <label ref={labelRef} htmlFor={id} className="labelAnimation">
        {placeholder}
      </label>
    </div>
  );
};

export default Contact;
