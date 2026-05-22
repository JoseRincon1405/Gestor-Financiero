import { NavLink } from "react-router"

export default function Header() {



  return (
    <header className="container mx-auto  pb-10">
        <div className="bg-white p-5 flex justify-between rounded-lg shadow-2xs">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">GestiApp</h1>
            </div>
                <nav className="flex gap-8">
                    <NavLink
                        to={"/"}
                        className={({isActive}) =>
                        isActive ? 'text-green-600 uppercase font-bold' : 'text-gray-800 uppercase font-bold'
                        }
                    >
                        Inicio
                    </NavLink>

                    <NavLink
                        to={"/Transacciones"}
                        className={({isActive}) =>
                        isActive ? 'text-green-600 uppercase font-bold' : 'text-gray-800 uppercase font-bold'
                        }
                    >
                        Transacciones
                    </NavLink>
                </nav>
            
            
        </div>
    </header>
  )
}
