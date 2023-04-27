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
      id: Date.now(),
      topic: "리액트 공부하기",
      content: "리액트 기초를 공부해봅시다.",
      status: "Working",
    },
    {
      id: Date.now() + 1,
      topic: "리액트 코드짜기",
      content: "새로운 컴포넌트 만들기",
      status: "Done",
    },
  ]);

  //추가버튼
  const clickAddButton = () => {
    //새로운 형태의 newTodo를 만든다.
    //newToDo:{ id: 1, age: 30, name: "송중기" }
    //newUser를 배열에 더한다(users.length+1).
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

  const delFunction = (id) => {
    const newToDo = toDo.filter((user) => user.id !== id);
    setTodo(newToDo);
  };

  //이동 컴포넌트

  const workingTodos = toDo.filter((item) => item.status === "Working");
  const doneTodos = toDo.filter((item) => item.status === "Done");

  const toggleStatus = (id) => {
    setTodo(
      toDo.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            status: todo.status === "Working" ? "Done" : "Working",
          };
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <div>
      <div className="">
        <div>My Todo List</div>
        <div>React</div>
        <div className="">
          <div className="">
            제목&nbsp;
            <input value={topic} onChange={onTopicHandler} />
          </div>
          <div>
            내용&nbsp;
            <input value={content} onChange={onContentHandler} />
          </div>
          <button onClick={clickAddButton}>추가하기</button>
        </div>
        <br />
        <div>
          <div>
            <h2>Working...🔥</h2>
            <ul className="app-style">
              {workingTodos.map(function (item) {
                return (
                  <div key={item.id} item={item} className="component-style">
                    {item.topic}
                    <br />
                    {item.content}
                    <br />
                    <div className="button-set">
                      <button onClick={() => delFunction(item.id)}>삭제</button>
                    </div>
                    <div>
                      <button onClick={() => toggleStatus(item.id)}>
                        완료
                      </button>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
          <div>
            <h2>Done...!🎉</h2>
            <div className="app-style">
              {doneTodos.map(function (item) {
                return (
                  <div key={item.id} item={item} className="component-style">
                    {item.topic}
                    <br />
                    {item.content}
                    <br />
                    <div className="button-set">
                      <button onClick={() => delFunction(item.id)}>삭제</button>
                    </div>
                    <div>
                      <button onClick={() => toggleStatus(item.id)}>
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
