import { useEffect, useMemo, useState } from "react";
import { Button, ButtonGroup, Form, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash } from "tabler-icons-react";
import ConformModal from "../Model/ConformModal";
import { fetchUser } from "../../redux/user/userThunkApp";
import { useDispatch } from "react-redux";

const DataTable = ({
  title,
  columns,
  data = [],
  deleteData,
  loading,
  mainLoader,
  deleteLoading,
  itemsPerPage = 50,
  searchable = true,
  addButton = true,
  addButtonText = "Add New",
  searchPlaceholder = "Search...",
  actions = true,
  onRowClick,
  FormComponent,
  isShow = false,
  formProps = {},
  buttons = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sortedData = useMemo(() => {
    let sortable = [...data];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        const aValue = a[sortConfig.key]?.toString().toLowerCase();
        const bValue = b[sortConfig.key]?.toString().toLowerCase();
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [data, sortConfig]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(sortedData);
    } else {
      const filtered = sortedData.filter((item) =>
        columns.some((col) => {
          const value = col.field.split('.').reduce((obj, key) => obj?.[key], item);
          return col.searchable !== false && value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, sortedData, columns]);

  const currentItems = filteredData.slice(0, itemsPerPage);

  const renderCellContent = (item, column) => {
    if (column.body) return column.body(item);
    if (column.render) return column.render(item);
    return column.field.split('.').reduce((obj, key) => obj?.[key], item) || "";
  };

  const handleAdd = () => {
    isShow ? navigate("form") : setShowForm(true);
  };

  const handleEdit = (item) => {
      setSelectedRecord(item);
      setShowForm(true);
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  useEffect(() => {
  dispatch(fetchUser());
}, [dispatch]);

  return (
    <div className="card mt-5">
      <div className="card-header d-flex justify-content-between align-items-center px-3">
        <h5 className="mb-0">{title}</h5>
        {addButton && buttons && (
          <ButtonGroup>
            <Button variant="primary" onClick={handleAdd}>
              <i className="ti ti-plus me-2" />
              {addButtonText}
            </Button>
          </ButtonGroup>
        )}
      </div>

      {searchable && (
        <div className="px-3 py-2 border-bottom">
          <Form.Group className="d-flex align-items-center">
            <Form.Label className="mb-0 me-2">Search:</Form.Label>
            <Form.Control
              type="search"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-auto"
            />
          </Form.Group>
        </div>
      )}

      <div className="table-responsive">
        <Table className="table table-striped">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.field}
                  className="sortable"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const direction = sortConfig.key === col.field && sortConfig.direction === "asc" ? "desc" : "asc";
                    setSortConfig({ key: col.field, direction });
                  }}
                >
                  {col.header}
                  {sortConfig.key === col.field && (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                </th>
              ))}
              {actions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {mainLoader ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center">
                  <Spinner />
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onRowClick?.(item)}
                  style={{ cursor: onRowClick ? "pointer" : "default" }}
                >
                  {columns.map((col) => (
                    <td key={col.field}>{renderCellContent(item, col)}</td>
                  ))}
                  {actions && (
                    <td>
                      <div className="d-flex gap-2 justify-content-end">
                        <Button variant="light" onClick={() => handleEdit(item)}>
                          <Pencil size={18} />
                        </Button>
                        <Button variant="light" onClick={() => handleDelete(item._id)}>
                          <Trash size={18} />
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="text-center">
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {FormComponent && (
        <FormComponent
          show={showForm}
          handleClose={() => {
            setShowForm(false);
            setSelectedRecord(null);
          }}
          data={selectedRecord}
          loading={loading}
          {...formProps}
        />
      )}

      {showModal && (
        <ConformModal
          show={showModal}
          title="Confirm Delete"
          description="Are you sure you want to delete this record?"
          onHide={() => setShowModal(false)}
          handleConfirmation={async () => {
            await deleteData(selectedId);
            setShowModal(false);
          }}
          deleteLoading={deleteLoading}
        />
      )}
    </div>
  );
};

export default DataTable;
