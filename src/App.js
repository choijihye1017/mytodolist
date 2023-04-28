import "./App.css";
import { useState } from "react";

function App() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  //제목입력
  const onTopicHandler = (event) => {
    setTopic(event.target.value);
  };
  //내용입력
  const onContentHandler = (event) => {
    setContent(event.target.value);
  };

  const [toDo, setTodo] = useState([
    {
      id: 1,
      topic: "리액트 공부하기",
      content: "리액트 기초를 공부해봅시다.",
      status: "Working",
    },
    {
      id: 2,
      topic: "리액트 코드짜기",
      content: "새로운 컴포넌트 만들기",
      status: "Done",
    },
  ]);

  //추가버튼
  const clickAddButton = (e) => {
    e.preventDefault();
    const newToDo = {
      id: Date.now(),
      topic,
      content,
      status: "Working",
    };
    setTopic("");
    setContent("");
    setTodo([...toDo, newToDo]);
    //배열의 불변성 유지를 위해 toDo를 스프레드했다가 newToDo해준 형태로 만든다.
  };

  //삭제버튼
  const delFunction = (id) => {
    const delToDo = toDo.filter((user) => user.id !== id);
    setTodo(delToDo);
  };

  //완료-취소 버튼
  const workingTodos = toDo.filter((item) => item.status === "Working");
  const doneTodos = toDo.filter((item) => item.status === "Done");

  const toggleStatus = (id) => {
    setTodo(
      toDo.map((toDo) => {
        if (toDo.id === id) {
          return {
            ...toDo,
            status: toDo.status === "Working" ? "Done" : "Working",
          };
        } else {
          return toDo;
        }
      })
    );
  };

  return (
    <div className="layout">
      <div className="container">
        <div>My Todo List</div>
        <div>React</div>
      </div>
      <form onSubmit={clickAddButton} className="add-form">
        <div className="input-group">
          <label className="form-label">제목&nbsp;</label>
          <input
            value={topic}
            onChange={onTopicHandler}
            className="add-input"
          />
          <label className="form-label">내용&nbsp;</label>
          <input
            value={content}
            onChange={onContentHandler}
            className="add-input"
          />
        </div>
        <button className="add-button" type="submit">
          추가하기
        </button>
      </form>
      <div className="list-container">
        <h2 className="list-title">Working...🔥</h2>
        <div className="list-wrapper">
          {workingTodos.map(function (item) {
            return (
              <div key={item.id} item={item} className="todo-container">
                <div>
                  <h2 className="todo-title">{item.topic}</h2>
                  <div>{item.content}</div>
                </div>
                <div className="button-set">
                  <button
                    onClick={() => delFunction(item.id)}
                    className="todo-delete-button button"
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => toggleStatus(item.id)}
                    className="todo-complete-button button"
                  >
                    완료
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="">
          <h2 className="list-title">Done...!🎉</h2>
          <div className="list-wrapper">
            {doneTodos.map(function (item) {
              return (
                <div key={item.id} item={item} className="todo-container">
                  <div>
                    <h2 className="todo-title">{item.topic}</h2>
                    <div>{item.content}</div>
                  </div>
                  <div className="button-set">
                    <button
                      onClick={() => delFunction(item.id)}
                      className="todo-delete-button button"
                    >
                      삭제
                    </button>
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className="todo-complete-button button"
                    >
                      취소
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// const User = ({ item, delFunction }) => {
//   return (
//     <div key={item.id} className="component-style">
//       {item.age}-{item.name}
//       <button onClick={() => delFunction(item.id)}>X</button>
//     </div>
//   );
// };

// function TodoItem({ todo }) {
//   const [isDone, setIsDone] = useState(todo.isDone);

//   const toggleIsDone = () => {
//     setIsDone(!isDone);
//   }

//   return (
//     <div>
//       <span>{todo.task}</span>
//       <button onClick={toggleIsDone}>
//         {isDone ? '취소' : '완료'}
//       </button>
//     </div>
//   );
// }

export default App;
// 2. Todo의 **isDone 상태가 true이면, 상태 버튼의 라벨을 `취소`, isDone이 false 이면 라벨을 `완료`** 로 조건부 렌더링 해주세요. 위 영상을 보면 버튼 내 라벨이 다른 걸 볼 수 있죠?
// 3. Todo의 상태가 `Working` 이면 위쪽에 위치하고, `Done`이면 아래쪽에 위치하도록 구현합니다.
