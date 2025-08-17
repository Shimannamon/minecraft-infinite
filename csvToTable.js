fetch("1.21.8.csv")
  .then((response) => response.text())
  .then((csvText) => {
    const lines = csvText.trim().split("\n");
    const dataLines = lines.slice(1);

    // 1. 全データを配列に格納
    const items = dataLines.map((line) => {
      const [name, id, how, status] = line.split(",");
      return { name, id, how, status };
    });

    const tableBody = document.getElementById("tableBody");

    // 2. テーブル生成
    items.forEach((item) => {
      let howText = item.how;

      // すでにリンク化された部分を再度置換しないための工夫
      const sortedItems = [...items].sort(
        (a, b) => b.name.length - a.name.length
      );

      // 1回だけreplace、replaceのコールバックでリンク化
      sortedItems.forEach((other) => {
        if (other.name && other.id && other.name !== item.name) {
          // 既にリンク化された部分はスキップ
          const reg = new RegExp(`(${other.name})(?![^<]*?>)`, "g");
          howText = howText.replace(
            reg,
            `<a href="#${other.id}"><img src="image/${other.id}.png" alt="${other.name}" />$1</a>`
          );
        }
      });

      const row = document.createElement("tr");
      row.id = item.id;
      const imgTag = `<img src="image/${item.id}.png" alt="${item.name}" />`;
      row.innerHTML = `
    <td>${imgTag}</td>
    <td>${item.name}</td>
    <td>${item.id}</td>
    <td>${howText}</td>
    <td>${item.status}</td>
  `;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.error("エラー:", error));
