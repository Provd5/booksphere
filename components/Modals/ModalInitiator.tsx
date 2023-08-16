"use client";

import { type FC, useRef, useState } from "react";

import { type modalSizes } from "~/types/sizes";

import { ModalWrapper } from "./ModalWrapper";

interface ModalInitiatorProps {
  children: React.ReactNode;
  initiatorStyle: React.ReactNode;
  size?: modalSizes;
  customModalStateHandler?: () => void;
}

export const ModalInitiator: FC<ModalInitiatorProps> = ({
  children,
  initiatorStyle,
  size = "default",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative flex">
      <button
        ref={openModalButtonRef}
        aria-label="open-modal-button"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        {initiatorStyle}
      </button>
      {isModalOpen && (
        <ModalWrapper
          openModalButtonRef={openModalButtonRef}
          size={size}
          closeModalHandler={() => setIsModalOpen(false)}
        >
          {children}
        </ModalWrapper>
      )}
    </div>
  );
};
