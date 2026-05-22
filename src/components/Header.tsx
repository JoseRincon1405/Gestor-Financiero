import { NavLink } from "react-router-dom"

export default function Header() {

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? 'text-green-600 uppercase font-bold transition-colors' 
      : 'text-gray-800 hover:text-green-600 uppercase font-bold transition-colors'

  return (
    <header className="container mx-auto pb-10">
      <div className="bg-white p-5 flex justify-between rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">GestiApp</h1>
        </div>
        <nav className="flex gap-8 items-center">
          <NavLink to="/" className={navLinkClass}>
            Inicio
          </NavLink>

          <NavLink to="/transacciones" className={navLinkClass}>
            Transacciones
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
