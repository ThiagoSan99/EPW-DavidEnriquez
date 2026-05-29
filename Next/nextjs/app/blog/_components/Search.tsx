'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
export default function Search() {
    const router = useRouter();
    const params = useSearchParams();
    const [q, setQ] = useState(params.get('q') ?? '');
    function submit(e: React.FormEvent) {
        e.preventDefault();
        const p = new URLSearchParams(params);
        if (q) p.set('q', q); else p.delete('q');
        router.push(`/blog?${p.toString()}`);
    }
    return (
        <form onSubmit={submit}>
            <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar posts…"
            />
            <button type="submit">Buscar</button>
        </form>
    );
}