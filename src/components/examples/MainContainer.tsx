
import ButtonExamples from './ButtonExamples'
import AnimationExamples from './AnimationExamples'
import FormsExamples from './FormsExamples'
import CardsGallery from './CardsGallery'
import LoaderShowcase from './LoaderShowcase'
import LayoutsExamples from './LayoutsExamples'
import ModalsExamples from './ModalsExamples'

interface MainContainerProps {
  category: string
}

const MainContainer = ({ category }: MainContainerProps) => {
  return (
    <main className="flex-1 p-8 overflow-auto mt-16">
      {category === 'buttons' && <ButtonExamples />}
      {category === 'animations' && <AnimationExamples />}
      {category === 'forms' && <FormsExamples />}
      {category === 'layouts' && <LayoutsExamples />}
      {category === 'cards' && <CardsGallery />}
      {category === 'modals' && <ModalsExamples />}
      {category === 'loaders' && <LoaderShowcase />}
    </main>
  )
}

export default MainContainer
