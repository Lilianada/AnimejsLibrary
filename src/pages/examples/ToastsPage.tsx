
import AnimeToastExamples from "@/components/examples/toast/AnimeToastExamples";
import useAnimeToast from "@/components/examples/toast/useAnimeToast";

const ToastsPage = () => {
  const { ToastWrapper } = useAnimeToast();

  return (
    <ToastWrapper>
      <AnimeToastExamples />
    </ToastWrapper>
  );
};

export default ToastsPage;
