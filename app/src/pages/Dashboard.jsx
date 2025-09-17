import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../components/DataTable/DataTable";
import UserForm from "../components/Form/UserForm";
import { fetchUser, removeUser } from "../redux/user/userThunkApp";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { userData, error, loading, mainLoader, deleteLoading } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const columns = [
    {
      field: "#",
      header: "#",
      searchable: true,
    },
    {
      field: "firstName",
      header: "First Name",
      searchable: true,
    },
    {
      field: "lastName",
      header: "Last Name",
      searchable: true,
    },
    {
      field: "email",
      header: "Email",
      searchable: true,
    },
    {
      field: "number",
      header: "Phone",
      searchable: true,
    },
  ];

  const newUserData = userData.map((user, index) => ({
    "#": index + 1,
    ...user,
  }));

  return (
    <DataTable
      title="Users"
      columns={columns}
      data={newUserData}
      deleteData={async (id) => {
        await dispatch(removeUser(id));
      }}
      FormComponent={UserForm}
      loading={loading}
      mainLoader={mainLoader}
      exportButton={true}
      buttons={true}
      deleteLoading={deleteLoading}
      addButtonText="Add User"
      currentModule="User"
    />
  );
};

export default UsersTable;
