
import { Toaster } from "sonner";
import AnimeToastExamples from "@/components/examples/toast/AnimeToastExamples";
import useAnimeToast from "@/components/examples/toast/useAnimeToast";

const ToastsPage = () => {
  const { ToastWrapper } = useAnimeToast();

  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <ToastWrapper>
        <div className="p-4 sm:p-6">
          <AnimeToastExamples />
        </div>
      </ToastWrapper>
    </>
  );
};

export default ToastsPage;
