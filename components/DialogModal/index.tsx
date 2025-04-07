import React from "react";

export default function DialogModal({ id, children }: { id: string, children: React.ReactNode }) {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          {children}
        </div>
        <label className="modal-backdrop" htmlFor={id}>Close</label>
      </div>
    </>
  )
}