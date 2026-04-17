import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateCustomer, useCustomers, useDeleteCustomer, useUpdateCustomer } from "../api/customers.queries";
export default function CustomersPage() {
  const { data = [], isLoading, isError, error, refetch } = useCustomers();
  const createMut = useCreateCustomer();
  const deleteMut = useDeleteCustomer();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const updateMut = useUpdateCustomer();
  async function onCreate(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingId) {
        await updateMut.mutateAsync({
          id: editingId,
          dto: { fullName, email },
        });

        toast.success("Customer actualizado correctamente ✅");
        setEditingId(null);
      } else {
        await createMut.mutateAsync({ fullName, email });
        toast.success("Customer creado correctamente ✅");
      }

      setFullName("");
      setEmail("");

    } catch (err) {
      toast.error("Ocurrió un error ❌");
      console.error(err);
    }
  }
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Customers</h1>
          <button className="rounded-lg border px-3 py-2" onClick={() => refetch()}>
            Reintentar/Refrescar
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6 space-y-4">
        <form onSubmit={onCreate} className="rounded-xl border bg-white p-4 space-y-3">
          <p className="text-sm text-slate-600">
            <b>Mutation (POST)</b>: crea customer y luego invalida cache para refrescar listado.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                className="w-full rounded-lg border px-3 py-2"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                className="w-full rounded-lg border px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
            disabled={createMut.isPending || updateMut.isPending}
          >
            {editingId
              ? updateMut.isPending
                ? "Actualizando…"
                : "Actualizar"
              : createMut.isPending
              ? "Creando…"
              : "Crear"}
          </button>
          {editingId && (
            <button
              type="button"
              className="ml-2 rounded-lg border px-4 py-2"
              onClick={() => {
                setEditingId(null);
                setFullName("");
                setEmail("");
              }}
            >
              Cancelar
            </button>
          )}
          
          {createMut.isError && (
            <p className="text-sm text-red-600">Error creando: {String(createMut.error)}</p>
          )}
        </form>
        <div className="rounded-xl border bg-white">
          <div className="p-4 border-b">
            {isLoading && <p className="text-sm text-slate-600">Cargando…</p>}
            {isError && <p className="text-sm text-red-600">Error: {String(error)}</p>}
            {!isLoading && !isError && (
              <p className="text-sm text-slate-600">{data.length} registro(s)</p>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="p-3">Nombre</th>
                  <th className="p-3">Email</th>
                  <th className="p-3 w-28">Acción</th>
                </tr>
              </thead>
              <tbody>
                {data.map((c) => (
                  <tr key={c.id} className="border-t">
                    <td className="p-3">{c.fullName}</td>
                    <td className="p-3">{c.email}</td>
                    <td className="p-3 space-x-2">
                      <button
                        className="rounded-md border px-2 py-1 hover:bg-slate-50"
                        onClick={() => {
                          setEditingId(c.id);
                          setFullName(c.fullName);
                          setEmail(c.email);
                        }}
                      >
                        Editar
                      </button>
                      
                      <button
                        className="rounded-md border px-2 py-1 hover:bg-slate-50 disabled:opacity-50"
                        disabled={deleteMut.isPending}
                        onClick={async () => {
                          if (!confirm("¿Seguro que deseas borrar este customer?")) return;

                          try {
                            await deleteMut.mutateAsync(c.id);
                            toast.success("Customer eliminado 🗑️");
                          } catch (err) {
                            toast.error("Error al eliminar ❌");
                          }
                        }}
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}
                {!isLoading && !isError && data.length === 0 && (
                  <tr>
                    <td className="p-6 text-center text-slate-500" colSpan={3}>
                      No hay registros.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {deleteMut.isError && (
            <div className="p-4">
              <p className="text-sm text-red-600">Error borrando: {String(deleteMut.error)}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}