import { MarvelLayout } from "../layout/MarvelLayout"
import { HeroList } from "../views/HeroList"

export const DcPage = () => {
  return (
    <MarvelLayout>

      <HeroList publisher={ 'DC Comics' } />

    </MarvelLayout>
  )
}
