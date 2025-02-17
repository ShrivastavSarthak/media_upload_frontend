"use client"
import {
    useLazyGetMethodQuery
} from "@/services/data-service";
import { StringFormatService } from "@/services/string-format-service";
import { ApiMethod, mediaApiUrl } from "@/shared/enums/api-enum";
import { useAppSelector } from "@/shared/hooks/redux-hook";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { toast } from "sonner";
import Wz_Modals from "../modal";

export interface DeleteModalProps {
  isOpen: boolean;
  id: string;
  onClose: () => void;
  onDelete: () => void;
}

export function DeleteModal({
  id,
  isOpen,
  onClose,
  onDelete,
}: DeleteModalProps) {
  const token = useAppSelector((state) => state.user.token);

  const [trigger, { data, isLoading, error }] = useLazyGetMethodQuery();

  const handleDelete = async() => {
    try {
      const response = await trigger({
        httpResponse: {
          url: StringFormatService(mediaApiUrl.deleteMedia, [id]),
          reqType: ApiMethod.DELETE,
          headers: token,
        },
      });

      if ('error' in response) {
        throw new Error('Failed to delete media');
      }

      if (response.data?.statusCode === 200) {
        toast.success("Media deleted successfully");
        onDelete();
        onClose();
      } else {
        throw new Error('Failed to delete media');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete media";
      toast.error(errorMessage);
    }
  };

  return (
    <Wz_Modals
      isOpen={isOpen}
      handleClose={onClose}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}
    >
      <Box>
        <Typography variant="h6" component="h2">
          Confirm Delete
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </Typography>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            An error occurred. Please try again.
          </Typography>
        )}
        <Box
          sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
          <Button 
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Delete'
            )}
          </Button>
        </Box>
      </Box>
    </Wz_Modals>
  );
}
