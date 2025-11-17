import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLetters, createLetter, updateLetter } from '../../api/fakeApi';
import { useUIStore } from '../../stores/uiStore';
import { Letter } from '../../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Skeleton } from '../ui/skeleton';
import { Alert } from '../ui/alert';
import { StatusBadge } from '../atoms/StatusBadge';
import { LetterForm } from '../molecules/LetterForm';
import { Suspense, lazy } from 'react';

// Lazy load detail modal
const LetterDetailModal = lazy(() => import('./LetterDetailModal'));

export const LetterList = () => {
  const queryClient = useQueryClient();
  const { filterStatus, searchTerm, setFilterStatus, setSearchTerm, dialogOpen, setDialogOpen, selectedLetterId, setSelectedLetterId } = useUIStore();

  const { data: letters, isLoading, error } = useQuery<Letter[]>({
    queryKey: ['letters', filterStatus, searchTerm],
    queryFn: async () => {
      const allLetters = await getLetters();
      return allLetters.filter(letter => {
        const statusMatch = !filterStatus || letter.status === filterStatus;
        const searchMatch = !searchTerm || letter.trackingNumber.includes(searchTerm);
        return statusMatch && searchMatch;
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: createLetter,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['letters'] }),
    onError: (err: Error) => alert(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Letter> }) => updateLetter(id, updates),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['letters'] }),
    onError: (err: Error) => alert(err.message),
  });

  const handleCreate = (data: any) => {
    createMutation.mutate(data);
    setDialogOpen(false);
  };

  const handleUpdate = (id: string, data: any) => {
    updateMutation.mutate({ id, updates: data });
    setSelectedLetterId(null);
  };

  if (error) return <Alert variant="destructive">Error loading letters</Alert>;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <Input placeholder="Search by tracking number" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-1/3" />
        <Select value={filterStatus || 'all'} onValueChange={val => setFilterStatus(val === 'all' ? null : val)}>
          <SelectTrigger className="w-1/4"><SelectValue placeholder="Filter by status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="created">Created</SelectItem>
            <SelectItem value="in_transit">In Transit</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="returned">Returned</SelectItem>
          </SelectContent>
        </Select>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button>Create New Letter</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Letter</DialogTitle></DialogHeader>
            <LetterForm onSubmit={handleCreate} error={createMutation.error?.message} />
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? (
        <Skeleton className="h-32 w-full" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking Number</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Sent Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {letters?.map(letter => (
              <TableRow key={letter.id}>
                <TableCell>{letter.trackingNumber}</TableCell>
                <TableCell>{letter.recipientName}</TableCell>
                <TableCell>{letter.sentDate}</TableCell>
                <TableCell><StatusBadge status={letter.status} /></TableCell>
                <TableCell>
                  <Button variant="outline" onClick={() => setSelectedLetterId(letter.id)}>View/Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {selectedLetterId && (
        <Suspense fallback={<Skeleton className="h-64 w-full" />}>
          <LetterDetailModal
            letterId={selectedLetterId}
            onClose={() => setSelectedLetterId(null)}
            onUpdate={handleUpdate}
          />
        </Suspense>
      )}
    </div>
  );
};