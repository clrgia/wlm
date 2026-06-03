import Link from "next/link";

export function BackButton() {
    return (
      <Link
        href="/home"
      >
        <div className="w-8 h-8 cursor-pointer m-1">
          <img src={`/general/back_button.png`} alt="" />
        </div>
      </Link>
    );
}