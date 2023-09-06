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

function Friends({ friends, onSplitBill }) {
  return (
    <ul>
      {friends.map((friend) => (
        <li className="" key={friend.id}>
          <Friend friend={friend} onSplitBill={onSplitBill} />
        </li>
      ))}
    </ul>
  );
}

function Friend({ friend, onSplitBill }) {
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
      <button className="button" onClick={() => onSplitBill(friend)}>
        Select
      </button>
    </>
  );
}

function AddFriend({ onAddFriend, onShowFriendForm }) {
  const [friendName, setFriendName] = useState("");
  const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/48");

  // TODO random image çekmenin yolu bulunacak
  function submitAddFriendHandler(e) {
    e.preventDefault();

    if (!friendName) return;

    const newFriend = {
      id: Date.now(),
      name: friendName,
      image: imageUrl,
      balance: 0,
    };

    onAddFriend(newFriend);

    setFriendName(() => "");
    setImageUrl(() => "https://i.pravatar.cc/48");
    onShowFriendForm();
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
      <button className="button" onClick={onShowFriendForm}>
        Close
      </button>
    </>
  );
}

function SplitBill({ selectedFriend }) {
  const [billValue, setBillValue] = useState("");
  const [expense, setExpense] = useState("");
  const [friendExpense, setFriendExpense] = useState("");
  const [billOwner, setBillOwner] = useState("user");

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰 Bill value</label>
      <input
        type="text"
        value={billValue}
        onChange={(e) => setBillValue(e.target.value)}
      />
      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={expense}
        onChange={(e) => setExpense(e.target.value)}
      />
      <label>👫 {selectedFriend.name}'s expense</label>
      <input
        type="text"
        disabled=""
        value={friendExpense}
        onChange={(e) => setFriendExpense(e.target.value)}
      />
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

  function showFriendForm() {
    if (addFriendButton) {
      setAddFriendButton(() => false);
      setAddFriendForm(() => true);
    } else {
      setAddFriendButton(() => true);
      setAddFriendForm(() => false);
    }
  }

  function handleSplitBill(selectedFriend) {
    setSelectedFriend(() => selectedFriend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <Friends friends={friends} onSplitBill={handleSplitBill} />

        {addFriendButton && (
          <button className="button" onClick={() => showFriendForm()}>
            Add friend
          </button>
        )}

        {addFriendForm && (
          <AddFriend
            onAddFriend={handleAddFriend}
            onShowFriendForm={showFriendForm}
          />
        )}
      </div>

      {selectedFriend && <SplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}
