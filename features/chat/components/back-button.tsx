import Link from "next/link";

export function BackButton() {
    return (
        <Link
            href="/home"
            className="border p-1 inline-block mb-4 cursor-pointer"
        >
            Back
        </Link>
    );
}