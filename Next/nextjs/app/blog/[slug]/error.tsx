'use client';
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main>
            <h1>Algo salió mal</h1>
            <p>{error.message}</p>
            <button onClick={() => reset()}>Reintentar</button>
        </main>
    );
}