
import ButtonExamples from './ButtonExamples'
import AnimationExamples from './AnimationExamples'
import FormsExamples from './FormsExamples'
import CardsExamples from './CardsExamples'
import LayoutsExamples from './LayoutsExamples'

interface MainContainerProps {
  category: string
}

const MainContainer = ({ category }: MainContainerProps) => {
  return (
    <main className="flex-1 p-8">
      {category === 'buttons' && <ButtonExamples />}
      {category === 'animations' && <AnimationExamples />}
      {category === 'forms' && <FormsExamples />}
      {category === 'layouts' && <LayoutsExamples />}
      {category === 'cards' && <CardsExamples />}
    </main>
  )
}

export default MainContainer
