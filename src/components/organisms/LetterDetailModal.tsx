// src/components/organisms/LetterDetailModal.tsx
import { useQuery } from "@tanstack/react-query";
import { getLetterById } from "@/api/fakeApi";
import { Letter } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LetterForm } from "@/components/molecules/LetterForm";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  letterId: string;
  onClose: () => void;
  onUpdate: (id: string, data: any) => void;
}

const LetterDetailModal = ({ letterId, onClose, onUpdate }: Props) => {
  const { data: letter, isLoading } = useQuery<Letter | undefined>({
    queryKey: ["letter", letterId],
    queryFn: () => getLetterById(letterId),
  });

  if (isLoading) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent>
          <Skeleton className="h-96 w-full" />
        </DialogContent>
      </Dialog>
    );
  }

  if (!letter) {
    return null;
  }

  const handleSubmit = (data: any) => {
    onUpdate(letterId, data);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Letter</DialogTitle>
        </DialogHeader>
        <LetterForm
          defaultValues={letter}
          onSubmit={handleSubmit}
          isLoading={false}
        />
      </DialogContent>
    </Dialog>
  );
};

export default LetterDetailModal;