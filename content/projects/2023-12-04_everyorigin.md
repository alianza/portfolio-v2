---
title: EveryOrigin CORS Proxy
startDate: 2023-12-04
endDate: 2023-12-22
thumbnail: /assets/everyorigin.png
type: Personal
description: EveryOrigin is a free CORS proxy service that allows developers to
  circumvent CORS restrictions on websites that don't allow cross-origin
  requests. The service is free and open-source and was inspired by similar
  services like allorigins.win and whateverorigin.org. The service is built
  using Next.js and is hosted on Netlify.
---
As I had A number of projects using data from other domains and I grew tired of having to use 3rd party CORS proxy services, which always seems to be unstable, slow, unsafe and short-lived. So, I decided to build my own. 

I built EveryOrigin using Next.js and Next.js Api routes as back-end and hosted it on Netlify. The service is free and open-source and was inspired by similar services like [allorigins.win](https://allorigins.win) and [whateverorigin.org](https://whateverorigin.org).
Styling was done using TailwindCSS and code highlighting was done using [Highlight.js](https://highlightjs.org/).

The service is completely free to use and doesn't require any API key or rate limit. It's also open-source, and you can find the source code on [GitHub](https://github.com/alianza/everyorigin).

- - -

## Technologies & Frameworks

<ul class="icon-list">
<li>React.js <a href="https://react.dev/"><img src="/assets/react.png" alt="icon"></a></li>
<li>TailwindCSS <a href="https://tailwindcss.com/"><img src="/assets/tailwindcss.png" alt="icon"></a></li>
<li>Node.js <a href="https://nodejs.org/en"><img src="/assets/nodejs.png" alt="icon"></a></li>
<li>Sass <a href="https://sass-lang.com/"><img src="/assets/sass.png" alt="icon"></a></li>
<li>GitHub <a href="https://github.com/"><img src="/assets/github.png" alt="icon"></a></li>
<li>Next.js <a href="https://nextjs.org/"><img src="/assets/nextjs.png" alt="icon"></a></li>
</ul>

- - -

<div class="images-grid">
<img src="/assets/everyorigin_1.png" />
<img src="/assets/everyorigin_2.png" />
<img src="/assets/everyorigin_3.png" />
</div>

<video autoplay muted loop playsinline controls src="/assets/everyorigin.mp4"></video>

- - -

## Additional Libraries

* [nextjs-progressbar](https://www.npmjs.com/package/nextjs-progressbar)
* [react-transition-scroll](https://www.npmjs.com/package/react-transition-scroll)
* [prettier](https://www.npmjs.com/package/prettier)
* [prettier-plugin-tailwindcss](https://www.npmjs.com/package/prettier-plugin-tailwindcss)
* [highlight.js](https://highlightjs.org/)
* [heroicons](https://heroicons.com/)
* [React-Toastify](https://github.com/fkhadra/react-toastify)

- - -

## Lighthouse Audit Score ![icon](/assets/lighthouse.png)

![Lighthouse Audit Score](/assets/lighthouse_everyorigin.png "Lighthouse Audit Score")

- - -

## Summary

EveryOrigin is a free CORS proxy service that allows developers to circumvent CORS restrictions on websites that don't allow cross-origin requests.

This is useful for developers who want to access the HTML content of a website from any origin. For instance if you want to fetch the HTML content of a website using Node.js (but you don't have a back-end server), you can use EveryOrigin to fetch the HTML content and then use the HTML content in your application.

- - -

<details >
<summary>Code Snippets</summary>
<div>

The following are some code snippets of the project that are powerful, demonstrate good coding practices and that I'm proud of. The snippets demonstrate clean, concise and powerful code. *(Code has been compacted in some cases).*

**Index.jsx page** 
The code snippet below demonstrates the home index page of the website. It's a simple page that allows users to input a URL and fetch the HTML content of the website. The page also displays the HTML content and a code snippet of how to fetch the HTML content with Node.js using the fetch Api.

Styling was done using TailwindCSS and code highlighting was done using [Highlight.js](https://highlightjs.org/).

```jsx
export default function Home() {
  const [url, setUrl] = useState(defaultUrl);
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [key, setKey] = useState(Date.now());
  const router = useRouter();
  const sampleCode = `const response = await fetch("https://${baseUrl}/get?url=${encodeURIComponent(
    url,
  )}");\nconst result = await response.text();`;

  useEffect(() => {
    if (!htmlContent) return;
    hljs.highlightAll();
  }, [htmlContent, loading]);

  const fetchHtml = async () => {
    setError(null);
    const start = Date.now();
    try {
      if (!url) throw new Error("URL is required");
      const validUrl = new URL(!url.includes("http://") && !url.includes("https://") ? `https://${url}` : url);
      setLoading(true);
      const response = await fetch(`/api/get?url=${encodeURIComponent(validUrl.toString())}`);
      const { html } = await response.json();
      if (!html) throw new Error("No HTML content found");
      if (html === htmlContent) return;
      triggerLoader(router);
      setKey(Date.now());
      setHtmlContent(html);
    } catch (error) {
      console.error("Error fetching HTML:", error);
      setError(error);
      setHtmlContent("");
    } finally {
      const end = Date.now();
      const duration = end - start;
      if (duration < 1000) await new Promise((resolve) => setTimeout(resolve, 1000 - duration));
      setLoading(false);
    }
  };

  const copySampleCode = async () => {
    await navigator.clipboard.writeText(sampleCode);
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.getElementById("sampleCode"));
    selection.removeAllRanges();
    selection.addRange(range);
    toast.success("Code copied to clipboard");
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between gap-8 p-4 pt-12 text-neutral-900 sm:p-24 dark:text-neutral-100 ${inter.className}`}
    >
      <Head>
        <title>EveryOrigin</title>
        <meta
          name="description"
          content="
        EveryOrigin is a free CORS proxy that allows you to access the HTML content of any website from any origin.
        Free and open source. No Api keyrequired. No rate limit. No annoying ads. No tracking. No bullshit. Just a simple CORS proxy. Enjoy!
        "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="absolute top-0 flex w-full justify-end p-2 ">
        <p>
          Authored by:&nbsp;
          <a href="https://jwvbremen.nl" rel=" noopener noreferrer" target="_blank">
            Jan-Willem van Bremen
          </a>
        </p>
      </header>

      <div className="relative m-auto place-items-center after:absolute after:top-0 after:-z-20 after:h-[180px] after:w-[180px] after:animate-[pulse_10s_ease-in-out_infinite] after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] after:sm:w-[360px] before:lg:h-[360px] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40">
        <h1 className="inline-block text-4xl font-bold sm:text-6xl" style={{ overflowWrap: "anywhere" }}>
          EveryOrigin
        </h1>
        <h2 className="text-xl font-bold sm:text-3xl">The free CORS proxy</h2>
      </div>

      <div className="flex flex-col items-center gap-8">
        <p>
          EveryOrigin is a free CORS proxy that allows you to access any website from any origin. Inspired by{" "}
          <a href="https://allorigins.win" target="_blank">
            allorigins.win
          </a>{" "}
          and{" "}
          <a href="https://whateverorigin.org" target="_blank">
            whateverorigin.org
          </a>
          {", "}
          which was a humble open source clone of{" "}
          <a href=" https://anyorigin.com" target="_blank">
            AnyOrigin.com
          </a>
          . All of them are either dead 🪦 or dead slow now. 🩻 So I decided to make my own version. It's free and open
          source. No Api key required. No rate limit. No annoying ads. No tracking. No bullshit. Just a simple CORS
          proxy. Enjoy!
        </p>
      </div>

      <div className="font-sans">
        <h2 className="text-4xl font-bold">Usage</h2>
        <h3 className="text-lg font-bold">Fill in the URL you want to fetch</h3>
        <div className="flex flex-col rounded bg-neutral-100 p-2 text-neutral-900 shadow-md xs:flex-row">
          <span style={{ overflowWrap: "anywhere" }}>{`https://${baseUrl}/get?url=`}</span>
          <span
            className={`flex-grow ${
              url === defaultUrl ? "font-bold italic" : ""
            } outline-none empty:before:cursor-text empty:before:text-neutral-400 empty:before:content-['Enter_website_URL']`}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setUrl(e.currentTarget.textContent.replaceAll(" ", "").replaceAll("\n", ""))}
            onKeyDown={async (e) => {
              if (e.key !== "Enter") return;
              e.preventDefault();
              await fetchHtml();
            }}
          >
            {defaultUrl}
          </span>

          <button
            className="-m-2 mt-0 rounded-b bg-blue-600 px-4 font-bold text-neutral-50 transition-colors hover:bg-blue-800 active:bg-blue-500 xs:-mt-2 xs:ml-2 xs:rounded-r xs:rounded-bl-none"
            onClick={fetchHtml}
          >
            Fetch
          </button>
        </div>
      </div>

      {loading && <Loader className="m-4" />}

      {error && !loading && <p className="p-4">Error fetching HTML content: {error.message}</p>}
      {htmlContent && !loading && (
        <TransitionScroll baseStyle={baseStyle} hiddenStyle={hiddenStyle} className="flex flex-col items-center">
          <h2 className="my-2 text-lg font-bold">HTML Content:</h2>
          <pre key={key} className="relative shadow-lg">
            <button
              className="absolute right-2 top-2 origin-center transition-transform hover:scale-110 active:scale-95"
              onClick={() => setHtmlContent("")}
            >
              <XMarkIcon className="h-8 w-8 stroke-2 text-neutral-900" />
            </button>
            <code className="language-html max-w-[calc(100vw-4em)] overflow-hidden rounded bg-neutral-100 p-2 text-neutral-800">
              {htmlContent}
            </code>
          </pre>

          <h2 className="mb-2 mt-6 text-lg font-bold">Node Fetch Example Code:</h2>
          <pre className="relative shadow-lg">
            <div className="flex justify-between rounded-t bg-slate-700 px-2 py-1">
              <span>Language: JavaScript</span>
              <ClipboardDocumentListIcon
                title="Copy code to clipboard"
                className="h-6 w-6 cursor-pointer text-neutral-100 transition-transform hover:scale-110 active:scale-95"
                onClick={copySampleCode}
              />
            </div>
            <code
              id="sampleCode"
              className="language-javascript overflow-hidden rounded-b bg-neutral-100 p-2 text-neutral-800"
              onDoubleClick={copySampleCode}
            >
              {sampleCode}
            </code>
          </pre>
        </TransitionScroll>
      )}
    </main>
  );
}
```

**Api get.js File**
The code snippet below demonstrates the Next.js Api route that fetches the HTML content of the website. The route is a simple GET request that fetches the HTML content of the website and returns it as a JSON object.

To facilitate CORS requests, the route sets the CORS headers to allow all origins, methods and headers.

```javascript
export default async function handler(req, res) {
  const { method } = req;
  let { url } = req.query;

  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  switch (method) {
    case "GET":
      try {
        if (!url.includes("http://") && !url.includes("https://")) {
          url = "https://" + url;
        }
        const response = await fetch(encodeURI(url));
        const html = await response.text();
        res.status(200).json({ html });
      } catch (error) {
        console.error("Error fetching HTML:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;
    default:
      res.status(400).json({ success: false, error: `Unhandled request method: ${method}` });
      break;
  }
}
```

</div>
</details>

- - -

### Check out the project!

[<button>![icon](/assets/github.png) GitHub</button>](https://github.com/alianza/everyorigin)
[<button>![icon](/assets/everyorigin.png) Check out the site!</button>](https://everyorigin.jwvbremen.nl/)
[<button>![icon](/assets/lighthouse.png) Lighthouse Audit</button>](/assets/lighthouse_everyorigin.html)

Projects using EveryOrigin CORS Proxy

[<button>![icon](/assets/nu.nl.webp) Nu.nl Clone</button>](https://nu.jwvbremen.nl/)

- - -
