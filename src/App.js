import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDelItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleDelArr() {
    const comfirm = window.confirm(" A u sure u want to CLEAR the list ?");
    if (comfirm) setItems((el) => el.filter((el) => el.length));
  }
  function hundleToggleItems(id) {
    setItems(
      items.map((item) => (item.id === id ? { ...item, packed: true } : item))
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form handleNeeds={handleItems} />
      <PackingList
        items={items}
        onHandleDelItem={handleDelItem}
        onHundleToggleItems={hundleToggleItems}
        onHundleDelArr={handleDelArr}
      />
      <Stats items={items} />
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
function PackingList({
  items,
  onHandleDelItem,
  onHundleToggleItems,
  onHundleDelArr,
}) {
  return (
    <div>
      <ul className="list">
        {items.map((item) => (
          <Item
            item={item}
            inHundleDeletes={onHandleDelItem}
            onHundleToggleItems={onHundleToggleItems}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select>
          <option value="inputs">Sort by input orders</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
      <button onClick={onHundleDelArr}>Clear list</button>
    </div>
  );
}
function Item({ item, inHundleDeletes, onHundleToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item}
        onChange={() => onHundleToggleItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => inHundleDeletes(item.id)}>X</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding somes to your parking list</em>
      </p>
    );
  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / numItems) * 100);
  return (
    <footer>
      <em className="stats">
        {percentage === 100
          ? "You got every thing! ready to go."
          : `you have ${numItems} items on your list, and you aready packed${" "}
        ${packedItems} (${percentage}%)`}
      </em>
    </footer>
  );
}
