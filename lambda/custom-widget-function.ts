type Event = {
  describe: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  widgetContext: any;
  person: string;
  go: boolean;
};

type Context = {
  invokedFunctionArn: string;
};

const DOCS = `
## custom-widget-function
Markdownでドキュメントを書くことができます。
**太字**、*イタリック*、~~打ち消し線~~、\`インラインコード\`などなど

* リスト
* リスト
  * ネスト
* リスト


1. 番号付きのリスト
2. 番号付きのリスト
  1. ネスト
3. 番号付きのリスト


[リンク](https://dev.classmethod.jp/author/eetann/)

![画像](https://raw.githubusercontent.com/eetann/choomame/main/public/icons/icon-128x128.png)

---

\`\`\` python
print("piyopiyo")
\`\`\`

### テーブルも書ける
name | ok
---|---
Kerry | true
Johnny | false
Goro | false

| name | ok |
|---|---|
| Kerry | true |
| Johnny | false |
| Goro | false |

`;

export const handler = async (event: Event, context: Context) => {
  if (event.describe) {
    return DOCS;
  }

  const timestamp = new Date();
  const person = event.person || "";
  const go = event.go || false;

  let response = "";

  const people = [
    { name: "Kerry", ok: true, cls: "btn kerry" },
    { name: "Johnny", ok: false, cls: "btn btn-primary" },
    { name: "Goro", ok: false, cls: "btn" },
  ];

  const rows = people
    .map(({ name, ok, cls }) => {
      return `
      <tr>
        <td>${name}</td>
        <td>
          <a class="${cls}">選ぶ</a>
          <cwdb-action
            action="call"
            endpoint="${context.invokedFunctionArn}" 
            confirmation="本当に${name}を選びますか？">
            { "person": "${name}", "go": ${ok} }
          </cwdb-action>
        </td>
        </td>
      </tr>
    `;
      // });
    })
    .join("");

  if (person) {
    if (go) {
      response = `${person}「着いたら連絡する」`;
    } else {
      response = `${person}「行けたら行く」`;
    }
  }

  const _event = event;
  _event.widgetContext.accountId = 123456789012;

  return `
    <div>
      <table>
        ${rows}
      </table>
      <p>${timestamp}</p>
      <p>${response}</p>
      <pre>${JSON.stringify(_event, null, 2)}</pre>
    </div>
    <style>
    .kerry {
      color: white !important;
      background-color: black !important;
    }
    </style>
  `;
};
