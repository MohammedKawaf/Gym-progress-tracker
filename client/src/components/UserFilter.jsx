function UserFilter({ users, selectedUser, onUserChange }) {
  return (
    <div className="user-filter">
      <label htmlFor="userSelect">Choose user:</label>
      <select
        id="userSelect"
        value={selectedUser}
        onChange={(event) => onUserChange(event.target.value)}
      >
        <option value="">All users</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default UserFilter;