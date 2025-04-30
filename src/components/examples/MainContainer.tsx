import ButtonExamples from './ButtonExamples'
import AnimationExamples from './AnimationExamples'
import FormsExamples from './FormsExamples'
import CardAndTileExamples from './CardAndTileExamples'
import LoaderShowcase from './LoaderShowcase'
import ToastsExamples from './ToastsExamples'
import DraggableExamples from './DraggableExamples'

interface MainContainerProps {
  category: string
}

const MainContainer = ({ category }: MainContainerProps) => {
  return (
    <main className="flex-1 p-8 overflow-auto mt-16">
      {category === 'buttons' && <ButtonExamples />}
      {category === 'animations' && <AnimationExamples />}
      {category === 'forms' && <FormsExamples />}
      {category === 'cards' && <CardAndTileExamples />}
      {category === 'loaders' && <LoaderShowcase />}
      {category === 'toasts' && <ToastsExamples />}
      {category === 'draggable' && <DraggableExamples />}
    </main>
  )
}

export default MainContainer
