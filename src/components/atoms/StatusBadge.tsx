// src/components/atoms/StatusBadge.tsx
import { Badge } from "@/components/ui/badge";

type Status = "created" | "in_transit" | "delivered" | "returned";

interface Props {
  status: Status;
}

const statusConfig: Record<Status, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  created: { label: "Created", variant: "secondary" },
  in_transit: { label: "In Transit", variant: "outline" },
  delivered: { label: "Delivered", variant: "default" },
  returned: { label: "Returned", variant: "destructive" },
};

export const StatusBadge = ({ status }: Props) => {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
};