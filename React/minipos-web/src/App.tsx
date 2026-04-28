import './App.css';
import { useState } from 'react';
import { Toaster } from "react-hot-toast";

import CustomersPage from "./pages/CustomersPage";
import DepartamentsPage from "./pages/DepartamentPage";
import TestMenuOptionPage from './pages/TestMenuOptionPage';
import About from './pages/About';

import MainLayout from "./layout/MainLayout";
import SidebarMenu from "./components/SidebarMenu";

import { getUser } from "./hooks/auth";
import { useMenu } from './hooks/useMenu';

function App() {
  const user = getUser();
  const [page, setPage] = useState("tmo"); // 🔥 default seguro
  const { data: menuOptions = [], isLoading } = useMenu();

  function renderContent() {
    if (!user) return <p>No autenticado</p>;

    switch (page) {
      case "customers":
        return user.role === "ADMIN" ? <CustomersPage /> : <About />;

      case "departaments":
        return user.role === "ADMIN" ? <DepartamentsPage /> : <About />;

      case "tmo":
        return <TestMenuOptionPage />;

      case "about":
        return <About />;

      default:
        return <About />;
    }
  }

  if (isLoading) {
    return <p>Cargando menú...</p>;
  }

  return (
    <>
      <Toaster position="top-right" />

      <MainLayout
        sidebar={
          <SidebarMenu
            current={page}
            onChange={setPage}
            menuOptions={menuOptions}
          />
        }
        content={renderContent()}
      />
    </>
  );
}

export default App;