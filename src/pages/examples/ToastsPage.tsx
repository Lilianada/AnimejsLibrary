
import { Toaster } from "sonner";
import AnimeToastExamples from "@/components/examples/toast/AnimeToastExamples";
import useAnimeToast from "@/components/examples/toast/useAnimeToast";

const ToastsPage = () => {
  const { ToastWrapper } = useAnimeToast();

  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <ToastWrapper>
        <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
          <AnimeToastExamples />
        </div>
      </ToastWrapper>
    </>
  );
};

export default ToastsPage;
