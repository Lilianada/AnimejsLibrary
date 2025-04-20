
import ButtonExamples from './ButtonExamples'
import AnimationExamples from './AnimationExamples'

interface MainContainerProps {
  category: string
}

const MainContainer = ({ category }: MainContainerProps) => {
  return (
    <main className="flex-1 p-8">
      {category === 'buttons' && <ButtonExamples />}
      {category === 'animations' && <AnimationExamples />}
    </main>
  )
}

export default MainContainer
