import Link from 'next/link';
const posts = [
    { slug: 'introduccion-next', title: 'Introducción a Next.js' },
    { slug: 'server-components', title: '¿Qué son los Server Components?' },
    { slug: 'app-router', title: 'App Router: la nueva forma de routear' },
];
export default function BlogPage() {
    return (
        <main>
            <h1>Blog</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}