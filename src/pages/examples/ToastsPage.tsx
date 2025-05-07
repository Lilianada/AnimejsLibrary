
import { Toaster } from "sonner";
import AnimeToastExamples from "@/components/examples/toast/AnimeToastExamples";
import useAnimeToast from "@/components/examples/toast/useAnimeToast";

const ToastsPage = () => {
  const { ToastWrapper } = useAnimeToast();

  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <ToastWrapper>
        <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimeToastExamples />
          </div>
        </div>
      </ToastWrapper>
    </>
  );
};

export default ToastsPage;
