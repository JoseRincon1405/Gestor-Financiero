import { lazy , Suspense } from "react"
import { BrowserRouter , Routes, Route} from "react-router-dom"
import Layout from "./layouts/Layout"

const IndexPage = lazy(() => import('./views/IndexPage'))
const TransPage = lazy(() => import('./views/TransPage'))


export default function AppRouter() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={
              <Suspense fallback="Cargando...">
                <IndexPage/>
              </Suspense>
            } index />
            <Route path="/transacciones" element={
              <Suspense fallback="Cargando...">
                <TransPage/>
              </Suspense>
            }/>
          </Route>
        </Routes>     
      </BrowserRouter>
    </>
  )
}

