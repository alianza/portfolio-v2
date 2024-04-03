import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const menuDef = [
  ['/#about', 'About me'],
  ['/#experiences', 'Experiences'],
  ['/cv', 'CV'],
  ['/#contact', 'Contact'],
];

function MenuList({ className }) {
  const shownProjects = useSearchParams().get('shownProjects');

  return (
    <ul className={`${className} flex flex-nowrap justify-between gap-4 whitespace-nowrap font-medium sm:gap-2`}>
      {menuDef.map(([href, text]) => (
        <li key={href}>
          <Link
            href={{
              pathname: href.split('#')[0], // Add pathname if it is not a hash
              ...(shownProjects && { query: { shownProjects } }),
              hash: href.split('#')[1], // Add hash if it exists
            }}
            className="link py-4"
          >
            <span className="shadow-2xl">{text}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MenuList;
