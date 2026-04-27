
import './App.css'
import CustomersPage from "./pages/CustomersPage";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layout/MainLayout";
import SidebarMenu from "./components/SidebarMenu";
import DepartamentsPage from "./pages/DepartamentPage";
import { useState } from 'react';
import TestMenuOptionPage from './pages/TestMenuOptionPage';
import About from './pages/About';
import { getUser } from "./hooks/auth";
import { useMenu } from './hooks/useMenu';

function App() {
  const user = getUser();
  const [page, setPage] = useState("customers");
  const { data: menuOptions = [] } = useMenu();

  function renderContent() {
    switch (page) {
      case "customers":
        return user?.role === "ADMIN" ? <CustomersPage /> : <About />;
      case "departaments":
        return user?.role === "ADMIN" ? <DepartamentsPage /> : <About />;
      case "tmo":
        return <TestMenuOptionPage />;
      case "about":
        return <About />;
      default:
        return <About />;
    }
  }
  return (
    <>
      <Toaster position="top-right" />
      <MainLayout
      sidebar={<SidebarMenu current={page} onChange={setPage} menuOptions={menuOptions}/>      }
      
      content={renderContent()} />
    </>
  )



}

export default App
