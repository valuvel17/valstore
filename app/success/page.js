import Link from "next/link";

export default function SuccessPage() {
    return (
        <div className="page-container">
            <h2 className="text-large">Thank you for your purchase!</h2>
            <Link href="/" >
            <button>
            Continue Shopping &rarr;
            </button>
            </Link>
        </div>
    );
}
