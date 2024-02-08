---
title: React Transition Scroll Library
startDate: 2022-09-11
endDate: 2022-10-20
thumbnail: /assets/react-transition-scroll.png
type: Personal
description: This project was my first attempt at creating a React library. It
  is a library that allows you easily animate items as they scroll into view. It
  is simple to use and has a number of customization options. I've used the
  library in a number of my own projects and it has been a great learning
  experience.
---
During the development of the personal protfolio website of Lea Shamaa I developed a React.js component responsible for animating elements into view as they entered the viewport. See [Personal Portfolio Project for Lea Shamaa](/projects/2022-02-21_portfolio_lea). After which I wanted to reuse the component in other projects like my [Skateboarding Tricks Tracker](/projects/2022-11-09_skateboard-tricks-tracker) Web Application or this personal portfolio website. So I decided to extract the React component and the functionality onto a standalone NPM React Component library. This was my very first public library that I ever created and released. The NPM page is accessible [here](https://www.npmjs.com/package/react-transition-scroll)!

- - -

## Technologies & Frameworks

<ul class="icon-list">
<li>React.js <a href="https://react.dev/"><img src="/assets/react.png" alt="icon"></a></li>
<li>TailwindCSS <a href="https://tailwindcss.com/"><img src="/assets/tailwindcss.png" alt="icon"></a></li>
<li>Node.js <a href="https://nodejs.org/en"><img src="/assets/nodejs.png" alt="icon"></a></li>
<li>Sass <a href="https://sass-lang.com/"><img src="/assets/sass.png" alt="icon"></a></li>
<li>GitHub <a href="https://github.com/"><img src="/assets/github.png" alt="icon"></a></li>
<li>NPM <a href="https://www.npmjs.com/"><img src="/assets/npm.png" alt="icon"></a></li>
<li>PropTypes <a href="https://github.com/facebook/prop-types"><img src="/assets/proptypes.png" alt="icon"></a></li>
</ul>

- - -

## Screens

<div class="images-grid">
<img src="/assets/react-transition-scroll_1.png" />
</div>

<video autoplay muted loop playsinline controls src="/assets/react-transition-scroll_2.webm"></video>

- - -

## Summary

The goal of this project was to make the Scroll Into View element I made for Lea Shamaa's Personal Portfolio Website reusable in other projects. The best way to achieve this was to create an NPM React Component Library out of it. I created a repository for it and bootstrapped it using the [create-react-library](https://www.npmjs.com/package/create-react-library) package which is based on [Microbundle](https://github.com/developit/microbundle). I added the React component in the source and imported and used it in the example website. The example website is hosted on GitHub Pages and the library itself is hosted on NPM.

- - -

##  

<details >
<summary>Code Snippets</summary>
<div>

The following are some code snippets of component code that is powerful, demonstrates good coding practices and that I'm proud of. The snippets demonstrate clean, concise and powerful code. *(Code has been compacted in some cases).*

**Library Index.js**\
This code snippet shows the code of the react-transition-scroll library itself. It contains the code to listen to intersections of the to animate elements with the viewport to change the styling facilitating the default transitions or the ones chosen by the developer. Using React PropTypes all props are communicated to the developer for easy integration with your project.

```jsx
let TransitionScrollTypes = TransitionScroll.propTypes = {
  threshold: PropTypes.number, // The percentage of the element that needs to be in view before the animation is triggered
  reAnimate: PropTypes.bool, // Whether the element will animate again once it is scrolled out of view and back in
  children: PropTypes.node.isRequired, // The element to animate, and it's children
  callBack: PropTypes.func, // A callback to be called when the element is in view
  baseStyle: PropTypes.object, // The base style of the element
  hiddenStyle: PropTypes.object, // The style of the element when it is not intersecting with the page
  showStyle: PropTypes.object, // The style of the element when it is intersecting with the page
  className: PropTypes.string // Additional class names to be added to the element
}

TransitionScroll.defaultProps = {
  threshold: 0,
  reAnimate: false,
  callBack: (entry) => {},
  baseStyle: {},
  hiddenStyle: {
    opacity: .5,
    translate: '0 12px',
    filter: 'blur(4px)'
  },
  showStyle: {
    opacity: 1,
    translate: '0 0',
    filter: 'none'
  },
  className: ''
}

/**
 *
 * Use this component to wrap your content with, and it will apply the hiddenStyle
 * when the element is not intersecting with the page. When the element comes into
 * view, the showStyle will be applied and the element will animate between the two.
 * You can configure all styles using the appropriate props. And some default styles
 * are provided for you to use. You can also alter the percentage of the element
 * that needs to be in view before the animation is triggered, and whether the element
 * will animate again once it is scrolled out of view and back in. A callback can be set
 * to be called when the element is in view. This could be used to lazy load images too!
 *
 * @type {React.FC<InferProps<TransitionScrollTypes>>}
 * @returns {JSX.Element} - The element to animate, and it's children
 *
 * Author: Jan-Willem van Bremen
 * Website: https://jwvbremen.nl/
 * Language: javascript
 *
 */

export function TransitionScroll({
  threshold = 0,
  reAnimate = false,
  children,
  callBack = (entry) => {},
  baseStyle = {},
  hiddenStyle = {
    opacity: .5,
    translate: '0 12px',
    filter: 'blur(4px)'
  },
  showStyle = {
    opacity: 1,
    translate: '0 0',
    filter: 'none'
  },
  className = ''
}) {
  const elementRef = React.createRef()
  const [style, setStyle] = useState(Object.assign({}, baseStyle, hiddenStyle))
  const [didCallBack, setDidCallBack] = useState(false)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: threshold / 100
    }

    let observer;

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries, observer) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setStyle(Object.assign({}, baseStyle, showStyle))
              if (!reAnimate) {
                observer.unobserve(entry.target)
              }
              if (!didCallBack) {
                callBack(entry)
                setDidCallBack(true)
              }
            } else {
              setStyle(Object.assign({}, baseStyle, hiddenStyle))
              setDidCallBack(false)
            }
          }),
        options
      )

      observer.observe(elementRef.current)
    }  else {
      setStyle(Object.assign({}, baseStyle, showStyle))
    }

    return () => observer?.disconnect()
  }, [])

  return (
    <div ref={elementRef} style={style} className={`${styles.baseStyle} ${className}`}>
      {children}
    </div>
  )
}
```

**Example usage code**\
These code snippets demonstrate how to use the React-transition-scroll library in your React application.

</div>
</details>
