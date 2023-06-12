import React from 'react'
import { MarvelLayout } from '../layout/MarvelLayout'
import { HeroList } from '../views/HeroList'

export const MarvelPage = () => {
  return (
    <MarvelLayout>

      <HeroList publisher={ 'Marvel Comics' } />
      
    </MarvelLayout>
    
  )
}
