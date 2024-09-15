import { useState, useEffect } from "react";
import { setAdmin, getUsers } from "../../services/adminServices";
import { toast } from "react-toastify";

type grantType = {
  name: string;
  _id: string;
  id: string;
  isAdmin: boolean;
  email: string;
};

const AdminGrant = ({ closeModal }: { closeModal: () => void }) => {
  const [users, setUsers] = useState<grantType[]>();
  const [filteredUsers, setFilteredUsers] = useState<grantType[]>();
  const [searchQuery, setSearchQuery] = useState("");

  const filterUsers = (users?: grantType[]) => {
    if (searchQuery && searchQuery.trim().length > 1) {
      return users?.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      return users;
    }
  };

  const fetchUsers = async () => {
    getUsers()
      .then((user) => {
        setUsers(user);
        const filtered = filterUsers(user);
        setFilteredUsers(filtered);
      })
      .catch(() => {
        toast.error("Error loading users");
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = filterUsers(users);
    setFilteredUsers(filtered);
  }, [searchQuery]);

  const adminToggle = async (id: string) => {
    await setAdmin(id);
    await fetchUsers();
  };

  return (
    <div className="modal gCont">
      <div className="modal-content">
        <h2>Search Users</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ul>
          {filteredUsers &&
            filteredUsers.map((user) => (
              <li key={user.id}>
                <div>
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
                <button onClick={() => adminToggle(user.id)}>
                  {user.isAdmin ? "Remove Admin" : "Make Admin"}
                </button>
              </li>
            ))}
        </ul>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default AdminGrant;
