import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DcPage } from '../pages/DcPage'
import { MarvelPage } from '../pages/MarvelPage'
import { HeroPage } from '../pages/HeroPage'
import { SearchPage } from '../pages/SearchPage'

export const MarvelRoutes = () => {
  return (
    // RUTAS DEL APARTADO DE MMARVEL PARA LAS PAGINAS PRINCIPALES DENTRO DE ESTA SECCION
    <Routes>

        <Route path='marvel' element={ <MarvelPage /> } />
        <Route path='dc' element={ <DcPage /> } />
        {/* este componente sera especial ya que recibira tambien un dato dentro de la url  */}
        {/* <Route path='hero/:id' element={ <HeroPage /> } /> */}
        {/* <Route path='search' element={ <SearchPage /> } /> */}

        <Route path='/*' element={ <Navigate to="/marvel" /> } />

    </Routes>
  )
}
