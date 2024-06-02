export function Header() {
    return (
        <header className="flex items-baseline gap-8 p-6">
            <a href="./">
                <h1 className="text-center text-lg font-bold uppercase">
                    Cosmos
                </h1>
            </a>
            <ul className="contents">
                <li>
                    <a
                        href="./chronicles"
                        className="border border-transparent px-2 py-1 transition hover:border-black"
                    >
                        Chronicles
                    </a>
                </li>
                <li>
                    <a
                        href="./characters"
                        className="border border-transparent px-2 py-1 transition hover:border-black"
                    >
                        Characters
                    </a>
                </li>
            </ul>
        </header>
    );
}
