import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import Wz_Modals from "../modal";
import { useEffect, useState } from "react";
import {
  useGetMethodQuery,
  usePostMethodMutation,
} from "@/services/data-service";
import { ApiMethod, mediaApiUrl } from "@/shared/enums/api-enum";
import { useAppSelector } from "@/shared/hooks/redux-hook";
import { StringFormatService } from "@/services/string-format-service";
import { toast } from "sonner";

interface mediaInterface {
  _id: string;
  title: string;
  fileUrl: string;
  fileType: string;
}

export function UpdateModal({
  isOpen,
  onClose,
  mediaId,
  mediaUpdate
}: {
  isOpen: boolean;
  onClose: () => void;
  mediaId: string;
  mediaUpdate: ()=>void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [media, setMedia] = useState<mediaInterface>();
  const [file, setFile] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const token = useAppSelector((state) => state.user.token);
  const [updateMedia] = usePostMethodMutation();

  const {
    data,
    isError: fetchMediaByIdError,
    isLoading: isFetchingMedia,
  } = useGetMethodQuery({
    httpResponse: {
      url: StringFormatService(mediaApiUrl.getMediaById, [mediaId]),
      reqType: ApiMethod.GET,
      headers: token,
    },
  });

  useEffect(() => {
    if (data?.response?.media) {
      setMedia(data.response.media);
    }
  }, [data]);

  const handleSave = async () => {
    if (!file) {
      toast.error("Please select a file to update");
      return;
    }

    setIsUpdating(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await updateMedia({
        httpResponse: {
          url: StringFormatService(mediaApiUrl.updateMedia, [mediaId]),
          reqType: ApiMethod.PATCH,
          headers: token,
        },
        payload: formData,
      });

      if (response.data?.statusCode === 200) {
        toast.success("Media updated successfully");
        setPreview(null);
        setFile(null);
        mediaUpdate()
        onClose();
      } else {
        toast.error("Failed to update media");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update media";
      toast.error(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClose = () => {
    setPreview(null);
    setFile(null);
    onClose();
  };

  return (
    <Wz_Modals
      isOpen={isOpen}
      handleClose={handleClose}
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
          Update Item
        </Typography>

        {isFetchingMedia ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : fetchMediaByIdError ? (
          <Typography color="error" sx={{ my: 2 }}>
            Error loading media. Please try again.
          </Typography>
        ) : (
          <>
            <Box sx={{ mt: 2, height: 200, overflow: "hidden" }}>
              {preview ? (
                file?.type.startsWith("image/") ? (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <video
                    src={preview}
                    controls
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                )
              ) : media?.fileType === "image" ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/` + media?.fileUrl}
                  alt={media.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <video
                  src={`${process.env.NEXT_PUBLIC_API_URL}/` + media?.fileUrl}
                  controls
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </Box>

            <Button 
              variant="outlined" 
              component="label" 
              sx={{ mt: 2 }} 
              fullWidth
              disabled={isUpdating}
            >
              Choose New File
              <input
                type="file"
                hidden
                accept="image/*,video/*"
                onChange={handleFileSelect}
                disabled={isUpdating}
              />
            </Button>

            <Box
              sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
            >
              <Button 
                onClick={handleClose}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                onClick={handleSave}
                disabled={isUpdating || !file}
              >
                {isUpdating ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Wz_Modals>
  );
}
