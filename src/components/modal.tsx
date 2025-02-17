"use client";
import { Box, Modal } from "@mui/material";
import { ReactElement } from "react";

export default function Wz_Modals({
  children,
  isOpen,
  style,
  handleClose,
  sx,
  BackdropProps,
}: {
  children: ReactElement;
  isOpen: boolean;
  style: any;
  handleClose?: () => any;
  sx?: object;
  BackdropProps?: any;
}) {
  return (
    <Modal
      sx={sx}
      open={isOpen}
      onClose={handleClose}
      BackdropProps={BackdropProps}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
}
