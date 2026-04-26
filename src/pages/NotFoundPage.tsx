import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="min-h-screen bg-transparent px-4 py-10 text-slate-100">
            <div className="mx-auto flex max-w-3xl flex-col items-center rounded-[2rem] border border-slate-800 bg-[#11131b] px-6 py-12 text-center shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)]">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
                    Error 404
                </p>
                <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
                    Page not found
                </h1>
                <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
                    The page you are looking for does not exist or may have been moved.
                </p>
                <Link
                    to="/"
                    className="mt-8 inline-flex rounded-full bg-[var(--purple)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--red)] focus:outline-none focus:ring-4 focus:ring-[var(--purple-border)]"
                >
                    Back to home
                </Link>
            </div>
        </div>
    );
}

export default NotFoundPage;
