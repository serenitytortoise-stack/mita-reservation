function selectType(type) {
  localStorage.setItem("reservationType", type);

  if (type === "first") {
    alert("初診予約を選択しました。次に日付選択へ進みます。");
  } else {
    alert("再診予約を選択しました。次に日付選択へ進みます。");
  }
}