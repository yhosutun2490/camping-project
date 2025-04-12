"use client";
import React from "react";

export default function DialogModal({
  id,
  children,
  modalRef
}: {
  id: string;
  children: React.ReactNode;
  modalRef?: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <>
      <input type="checkbox" ref={modalRef} id={id} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box mb-[25dvh] bg-gray-50">{children}</div>
        <label className="modal-backdrop" htmlFor={id}>
          Close
        </label>
      </div>
    </>
  );
}
