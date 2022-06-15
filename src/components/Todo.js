import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

let unSubscribe = () => {};

const Todo = ({ user }) => {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [myTodos, setMyTodos] = useState([]);

  const addTodo = () => {
    db.collection("todos")
      .doc(user.uid)
      .set({
        todos: [...myTodos, text],
      });
    setText("");
  };

  const deleteTodo = (deleteTodo) => {
    const docRef = db.collection("todos").doc(user.uid);
    docRef.get().then((docSnap) => {
      const result = docSnap.data().todos.filter((todo) => todo != deleteTodo);
      docRef.update({
        todos: result,
      });
    });
  };

  useEffect(() => {
    if (user) {
      const docRef = db.collection("todos").doc(user.uid);
      unSubscribe = docRef.onSnapshot((docSnap) => {
        if (docSnap.exists) {
          console.log("docSnap : ", docSnap);
          setMyTodos(docSnap.data().todos);
        } else {
          console.log("No docs");
        }
      });
    } else {
      navigate("/login");
    }

    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <div className="container">
      <h1>Add Todo's</h1>
      <div className="input-field">
        <input
          placeholder="Add todos"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="btn blue" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul className="collection">
        {myTodos?.map((todo) => (
          <li className="collection-item" key={todo}>
            {todo}
            <i
              className="material-icons right"
              onClick={() => deleteTodo(todo)}
            >
              delete
            </i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
