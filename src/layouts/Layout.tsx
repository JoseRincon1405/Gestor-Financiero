

import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import Header from "../components/Header" // Asegúrate de que la ruta de importación sea la correcta

export default function Layout() {
  return (
    <>

      <div className="px-6 lg:px-16 py-10">
        <Header/>

        <main className="container mx-auto mt-6">

          <Suspense fallback={<p className="text-center text-gray-500 font-semibold">Cargando...</p>}>
            <Outlet/>
          </Suspense>
        </main>
      </div>
    </>
  )
}
