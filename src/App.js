import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passport", quantity: 2, packed: false },
  { id: 12, description: "Socks", quantity: 12, packed: true },
  { id: 1, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState([]);
  function handleItems(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Form handleNeeds={handleItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Far Away</h1>;
}

function Form({ handleNeeds }) {
  let [description, setDescription] = useState("");
  let [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    console.log(newItem);

    handleNeeds(newItem);
    setDescription("");
    setQuantity("");
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (el, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
}
function PackingList({ items }) {
  return (
    <ul className="list">
      {items.map((item) => (
        <Item item={item} />
      ))}
    </ul>
  );
}
function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>X</button>
    </li>
  );
}

function Stats() {
  return (
    <footer>
      <em>you have x items on your list, and you aready packed x</em>
    </footer>
  );
}
