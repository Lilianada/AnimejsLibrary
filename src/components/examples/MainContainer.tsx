
import ButtonExamples from './ButtonExamples'

interface MainContainerProps {
  category: string
}

const MainContainer = ({ category }: MainContainerProps) => {
  return (
    <main className="flex-1 p-8">
      {category === 'buttons' && <ButtonExamples />}
    </main>
  )
}

export default MainContainer
