import {
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface Props {
  open: boolean;
  children: React.ReactNode;
  hasInitialValues?: boolean;
  onClose: () => void;
}

export default function ContactFormDialog({
  open,
  hasInitialValues,
  children,
  onClose,
}: Props) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xs"
      fullScreen={mobile}
      onClose={onClose}
    >
      <DialogTitle>{hasInitialValues ? "Update" : "Add a"} Contact</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
