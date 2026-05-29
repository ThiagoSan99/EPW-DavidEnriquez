import Link from 'next/link';
import Search from './_components/Search';
const posts = [
    { slug: 'introduccion-next', title: 'Introducción a Next.js' },
    { slug: 'server-components', title: '¿Qué son los Server Components?' },
    { slug: 'app-router', title: 'App Router: la nueva forma de routear' },
];
type Props = {
    searchParams: Promise<{ q?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
    const { q = '' } = await searchParams;
    const filtered = q
        ? posts.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()))
        : posts;
    return (
        <main>
            <h1>Blog</h1>
            <Search />
            <ul>
                {filtered.map((post) => (
                    <li key={post.slug}>
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}