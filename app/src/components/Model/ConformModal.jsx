import { Modal, Spinner } from "react-bootstrap";

function ConformModal({
  onHide,
  description,
  handleConfirmation,
  title,
  deleteLoading,
  ...props
}) {

  return (
    <Modal
      {...props}
      backdrop={deleteLoading ? "static" : true}
      keyboard={!deleteLoading}
      size="md"
      centered
    >
      <Modal.Header closeButton className="border-b border-gray-200">
        <Modal.Title className="text-lg font-semibold text-gray-800">
          {title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-gray-700">
        <p className="mb-4">{description}</p>

      </Modal.Body>

      <Modal.Footer className="flex justify-end gap-3">
        <button
          onClick={onHide}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          onClick={() => handleConfirmation()}
          className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 flex items-center gap-2 transition"
        >
          Yes
          {deleteLoading && (
            <Spinner animation="border" size="sm" className="!ml-1 !align-middle" />
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConformModal;
