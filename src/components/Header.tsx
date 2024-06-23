import { SearchButton } from '@/components/Search';
import { cosmogoniesApi } from '@/data/cosmogonies';

export async function Header() {
    const cosmogonies = await cosmogoniesApi.getAll();

    return (
        <header className="flex items-baseline justify-between gap-8 px-20 py-6">
            <a href="/">
                <h1 className="text-center text-lg font-bold uppercase">
                    ✦&nbsp;Cosmos
                </h1>
            </a>
            <div>
                <SearchButton cosmogonies={cosmogonies} />
            </div>
        </header>
    );
}
