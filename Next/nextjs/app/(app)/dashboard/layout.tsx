import Link from 'next/link';
export default function DashboardLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24 }}>
            <aside style={{ padding: 16, background: '#f3f4f6', borderRadius: 8 }}>
                <h3>Dashboard</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li><Link href="/dashboard">Inicio</Link></li>
                    <li><Link href="/dashboard/settings">Configuración</Link></li>
                    <li><Link href="/dashboard/analytics">Analítica</Link></li>
                </ul>
            </aside>
            <section>{children}</section>
        </div>
    );
}