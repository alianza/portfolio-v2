'use client';

import { capitalize } from '@/lib/utils';
import { cloneElement, useEffect, useRef, useState } from 'react';

function FormInput({ input, className = '', required = true }) {
  const labelRef = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (labelRef.current && !labelWidth) setLabelWidth(labelRef.current.offsetWidth + 6); // Determine label width to set textIndent
  }, [labelWidth]);

  let { id, placeholder = capitalize(id), name = id, className: inputClassNameProp } = input.props;

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
}

export default FormInput;
