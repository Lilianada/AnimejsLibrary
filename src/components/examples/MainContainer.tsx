
import ButtonExamples from './ButtonExamples'
import AnimationExamples from './AnimationExamples'
import FormsExamples from './FormsExamples'
import CardsExamples from './CardsExamples'
import LayoutsExamples from './LayoutsExamples'
import ModalsExamples from './ModalsExamples'
import LoadersExamples from './LoadersExamples'

interface MainContainerProps {
  category: string
}

const MainContainer = ({ category }: MainContainerProps) => {
  return (
    <main className="flex-1 p-8 overflow-auto">
      {category === 'buttons' && <ButtonExamples />}
      {category === 'animations' && <AnimationExamples />}
      {category === 'forms' && <FormsExamples />}
      {category === 'layouts' && <LayoutsExamples />}
      {category === 'cards' && <CardsExamples />}
      {category === 'modals' && <ModalsExamples />}
      {category === 'loaders' && <LoadersExamples />}
    </main>
  )
}

export default MainContainer
