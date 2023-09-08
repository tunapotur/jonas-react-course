import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Friends({
  friends,
  setSelectedFriend,
  selectedFriend,
  hideFriendForm,
}) {
  return (
    <ul>
      {friends.map((friend) => (
        <li className="" key={friend.id}>
          <Friend
            friend={friend}
            setSelectedFriend={setSelectedFriend}
            selectedFriend={selectedFriend}
            hideFriendForm={hideFriendForm}
          />
        </li>
      ))}
    </ul>
  );
}

function Friend({ friend, setSelectedFriend, selectedFriend, hideFriendForm }) {
  return (
    <>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}€
        </p>
      )}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {friend.balance * -1}€
        </p>
      )}
      <button
        className="button"
        onClick={() => {
          selectedFriend !== friend
            ? setSelectedFriend(() => friend)
            : setSelectedFriend(() => null);
          hideFriendForm();
        }}
      >
        {selectedFriend === friend ? "Close" : "Select"}
      </button>
    </>
  );
}

function AddFriendForm({ onAddFriend, onToggleFriendForm }) {
  const [friendName, setFriendName] = useState("");
  const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/48");

  function submitAddFriendHandler(e) {
    e.preventDefault();

    if (!friendName || !imageUrl) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id: id,
      name: friendName,
      image: `${imageUrl}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setFriendName(() => "");
    setImageUrl("https://i.pravatar.cc/48");
    onToggleFriendForm();
  }

  return (
    <>
      <form className="form-add-friend" onSubmit={submitAddFriendHandler}>
        <label>👫 Friend name</label>
        <input
          type="text"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
        />
        <label>🌄 Image URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button className="button">Add</button>
      </form>
      <button className="button" onClick={onToggleFriendForm}>
        Close
      </button>
    </>
  );
}

function SplitBill({ selectedFriend, setSelectedFriend, updateFriendBalance }) {
  const [billValue, setBillValue] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const [friendExpense, setFriendExpense] = useState("");
  const [billOwner, setBillOwner] = useState("user");

  function splitBillSubmit(e) {
    e.preventDefault();

    if (!billValue || !userExpense) return;

    if (billOwner === "user")
      updateFriendBalance(
        selectedFriend.id,
        selectedFriend.balance + friendExpense
      );

    if (billOwner === "friend")
      updateFriendBalance(
        selectedFriend.id,
        selectedFriend.balance - userExpense
      );

    setBillValue("");
    setUserExpense("");
    setFriendExpense("");
    setBillOwner("user");
    setSelectedFriend(null);
  }

  function billValueHandler(e) {
    setBillValue(e.target.value);
    setFriendExpense(e.target.value);
  }

  function userExpenseHandler(e) {
    setUserExpense(e.target.value);
    setFriendExpense(billValue - e.target.value);
  }

  return (
    <form className="form-split-bill" onSubmit={splitBillSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input type="text" value={billValue} onChange={billValueHandler} />

      <label>🧍‍♀️ Your expense</label>
      <input type="text" value={userExpense} onChange={userExpenseHandler} />

      <label>👫 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={friendExpense} />

      <label>🤑 Who is paying the bill</label>
      <select value={billOwner} onChange={(e) => setBillOwner(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <button className="button">Split bill</button>
    </form>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [addFriendButton, setAddFriendButton] = useState(true);
  const [addFriendForm, setAddFriendForm] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  }

  function hideFriendForm() {
    setAddFriendButton(() => true);
    setAddFriendForm(() => false);
  }

  function showFriendForm() {
    setAddFriendButton(() => false);
    setAddFriendForm(() => true);
  }

  function toggleFriendForm() {
    addFriendButton ? showFriendForm() : hideFriendForm();
  }

  function updateFriendBalance(id, newBalance) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === id ? { ...friend, balance: newBalance } : friend
      )
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <Friends
          friends={friends}
          setSelectedFriend={setSelectedFriend}
          selectedFriend={selectedFriend}
          hideFriendForm={hideFriendForm}
        />

        {addFriendButton && (
          <button className="button" onClick={toggleFriendForm}>
            Add friend
          </button>
        )}

        {addFriendForm && (
          <AddFriendForm
            onAddFriend={handleAddFriend}
            onToggleFriendForm={toggleFriendForm}
          />
        )}
      </div>

      {selectedFriend && (
        <SplitBill
          selectedFriend={selectedFriend}
          setSelectedFriend={setSelectedFriend}
          updateFriendBalance={updateFriendBalance}
        />
      )}
    </div>
  );
}
