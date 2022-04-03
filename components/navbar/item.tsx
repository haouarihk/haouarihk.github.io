// import next link
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export default function NavItem({
  children,
  to,
  onClick,
}: {
  children: ReactNode;
  to: string;
  onClick?: () => void;
}) {
  const router = useRouter();
  const isInThisPage = to.toLowerCase() === router.pathname;

  return isInThisPage ? (
    <div className="py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-md">
      {children}
    </div>
  ) : (
    <Link href={to} passHref>
      <div
        onClick={onClick}
        className=" py-2 px-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md cursor-pointer "
      >
        {children}
      </div>
    </Link>
  );
}
