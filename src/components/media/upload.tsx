import { Box, Button, Typography, CircularProgress } from "@mui/material";
import Wz_Modals from "../modal";
import { useState } from "react";
import { usePostMethodMutation } from "@/services/data-service";
import { useAppSelector } from "@/shared/hooks/redux-hook";
import { StringFormatService } from "@/services/string-format-service";
import { ApiMethod, mediaApiUrl } from "@/shared/enums/api-enum";
import { toast } from "sonner";

interface ResponseData {
  statusCode: number;
  message?: string;
}

export interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaUpload: () => void;
}

export function UploadModal({ isOpen, onClose,mediaUpload }: UploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const MAX_FILE_SIZE = 10 * 1024 * 1024; 

  const token = useAppSelector((state) => state.user.token);
  const [uploadMedia] = usePostMethodMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await uploadMedia({
        httpResponse: {
          reqType: ApiMethod.POST,
          url: mediaApiUrl.uploadMedia,
          headers: token,
        },
        payload: formData,
      });

      if ((response.data as ResponseData)?.statusCode === 201) {
        toast.success("Media uploaded successfully");
        mediaUpload();
        handleClose();
      } else {
        toast.error((response.data as ResponseData)?.message || "Upload failed");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to upload media";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds 10MB limit");
        setSelectedFile(null);
        setPreview(null);
        return;
      }

      if (!file.type.match(/^(image|video)\//)) {
        setError("Please select an image or video file");
        setSelectedFile(null);
        setPreview(null);
        return;
      }

      setSelectedFile(file);
      setError(null);

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleClose = () => {
    onClose();
    setPreview(null);
    setSelectedFile(null);
    setError(null);
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
          Upload Media
        </Typography>
        <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
          <Button 
            variant="outlined" 
            component="label" 
            fullWidth 
            sx={{ mb: 2 }}
            disabled={isUploading}
          >
            {selectedFile ? selectedFile.name : "Choose File"}
            <input
              type="file"
              hidden
              accept="image/*,video/*"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
          </Button>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {preview && (
            <Box sx={{ mb: 2, textAlign: "center" }}>
              {selectedFile?.type.startsWith("image/") ? (
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <video
                  src={preview}
                  controls
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                  }}
                />
              )}
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              onClick={handleClose}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!selectedFile || !!error || isUploading}
              startIcon={isUploading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Wz_Modals>
  );
}
