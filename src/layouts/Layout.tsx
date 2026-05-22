import { Outlet } from "react-router";
import Header from "../components/Header";


export default function Layout() {



  return (
    <>
    <div className="px-30 py-10">
    <Header/>

    <main className="container mx-auto ">
        <Outlet/>
    </main>
    </div>
    </>
  )
}
