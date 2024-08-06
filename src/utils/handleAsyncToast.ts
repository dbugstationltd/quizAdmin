import { toast } from "sonner";

type TProps<T> = {
  promise: Promise<T>;
  success: (data: T) => string;
};

const handleAsyncToast = async <T>({
  promise,
  success,
}: TProps<T>): Promise<T | undefined> => {
  const toastId = toast.loading("Loading...");

  try {
    const result = await promise;
    if ((result as any).status === "success") {
      toast.success(success(result), { id: toastId });
    } else {
      toast.error((result as any).message, { id: toastId });
    }

    return result;
  } catch (err: any) {
    toast.error("Something went wrong", { id: toastId });
    console.log(err.message);

    return undefined;
  }
};

export default handleAsyncToast;
