import Link from "next/link";


interface sideBarUIProps {
  title: string;
  theLink?: string[];
}

const SideBarUl = ({ title, theLink }: sideBarUIProps) => {
  return (
    <div>
      <h3 className="mb-4">{title}</h3>
      <ul className="ml-10 text-gray-400">
        {theLink && theLink.map((L, index) => (
          <li className="mb-2" key={index}>
            <Link href="#">{L}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBarUl;
