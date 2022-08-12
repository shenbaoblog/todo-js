import "./styles.css";

// 追加機能
// 追加ボタンを押したとき
//    inputのテキスト取得
//    inputタグ内部のテキスト初期化
//    li生成（）
//    ul内に追加
//    取得したタグ、追加、削除

const onClickAdd = () => {
  // テキストボックス値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // li生成
  const li = document.createElement("li");

  // divタグの生成
  const div = document.createElement("div");
  div.className = "list-row";

  // pタグの生成
  const p = document.createElement("p");
  p.innerText = text;
  p.className = "list-item-title";

  // button（完了）タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    const completeTarget = completeButton.parentNode.parentNode;

    deleteFromIncompleteList(completeTarget); // completeTargetを先に削除。（completeTargetの中身をいじってから削除すると、何を削除しているか、わからなくなる。（エラーもでる。））
    // document.getElementById("complete-list").appendChild(completeTarget);

    // 完了リストに追加する要素
    const addTarget = completeButton.parentNode.parentNode;
    const text = addTarget.querySelector(".list-item-title").innerText;
    addTarget.textContent = null;
    // const text = addTarget.querySelectorAll(".list-item-title").innerText;
    // document.getElementById("complete-list").appendChild(addTarget);

    // divタグを生成
    const div = document.createElement("div");
    div.className = "list-row";

    // liタグの生成
    const li = document.createElement("li");
    li.className = "list-item-title";
    li.innerText = text;

    // 戻すbuttonタグ生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの親タグを完了リストから削除
      const deleteTarget = backButton.parentNode.parentNode;

      // テキスト取得
      // const text = backButton.parentNode.firstElementChild.innerText;
      const text = deleteTarget.querySelector(".list-item-title").innerText;
      createIncompleteList(text);

      document.getElementById("complete-list").removeChild(deleteTarget);
    });

    div.appendChild(li);
    div.appendChild(backButton);
    addTarget.appendChild(div);

    // 完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  // button（削除）タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    const deleteTarget = deleteButton.parentNode.parentNode;
    deleteFromIncompleteList(deleteTarget);
  });

  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  li.appendChild(div);

  // 未完了のリストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
