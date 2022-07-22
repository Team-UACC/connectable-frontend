import Link from 'next/link';

const MENU = ['Connectable 안내서', '1:1 문의하기', '약관 및 정책'];

export default function MoreMenu() {
  return (
    <section className="absolute top-[6rem] left-[2rem] text-base font-semibold text-start w-4/5 ">
      <ul>
        {MENU.map(name => (
          <Link key={name} href={`docs/${name.replace(' ', '-')}`}>
            <a>
              <li className="w-full mb-2 leading-[3rem] cursor-pointer hover:font-bold hover:text-lg hover:leading-[3rem]">
                {name}
              </li>
            </a>
          </Link>
        ))}
      </ul>
    </section>
  );
}
