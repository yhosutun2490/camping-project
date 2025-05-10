"use client";
import React from "react";

type DialogModalProps = {
  id: string;
  children: React.ReactNode;
  modalRef?: React.RefObject<HTMLInputElement | null>;
  modalWidth?: `max-w-${string}`;
};

export default function DialogModal({
  id,
  children,
  modalRef,
  modalWidth
}: DialogModalProps) {
  return (
    <>
      <input type="checkbox" ref={modalRef} id={id} className="modal-toggle" />
      <div className="modal overflow-x-hidden" role="dialog">
        <div className={`modal-box bg-gray-50 ${modalWidth}`}>{children}</div>
        <label className="modal-backdrop" htmlFor={id}>
          Close
        </label>
      </div>
    </>
  );
}
