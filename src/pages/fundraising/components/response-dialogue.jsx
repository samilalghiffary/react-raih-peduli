import * as z from "zod";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateStatusFundraise } from "@/utils/api/fundraise";
import { Dialog, DialogClose, DialogContent, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const responseFormSchema = z.object({
  rejected_reason: z
    .string()
    .min(1, {
      message: "Kolom harus diisi",
    })
    .min(20, {
      message: "Alasan penolakan minimal 20 karakter",
    }),
});

const ResponseDialogue = ({ open, onOpenChange, id }) => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(responseFormSchema),
    defaultValues: {
      rejected_reason: "",
    },
  });

  const onSubmit = (data) => {
    const { rejected_reason } = data;

    updateStatusFundraise(id, "rejected", rejected_reason)
      .then((message) => Toast.fire({ icon: "success", title: message }))
      .catch((message) => Toast.fire({ icon: "error", title: message }))
      .finally(navigate("/penggalangan-dana"));
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="rejected_reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">Alasan ditolak</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="justify-end">
              <div className="flex gap-2">
                <DialogClose asChild>
                  <Button
                    size="sm"
                    type="button"
                    id="btn-action-negative"
                    className="bg-white w-24 text-[#293066] border-solid border-2 border-[#293066] hover:bg-[#293066] hover:text-white"
                  >
                    Batal
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  size="sm"
                  id="btn-action-positive"
                  className="bg-[#293066] w-24 hover:bg-[#293066]/80"
                >
                  Tolak
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ResponseDialogue;
