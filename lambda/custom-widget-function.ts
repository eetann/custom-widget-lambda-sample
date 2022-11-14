type Event = {
  person: string;
  ok: boolean;
};

type Context = {
  invokedFunctionArn: string;
};

export const handler = async (event: Event, context: Context) => {
  const timestamp = new Date();
  const person = event.person || "";
  const ok = event.ok || false;

  let response = "";

  const people = [
    { name: "Kerry", ok: true },
    { name: "Johnny", ok: false },
    { name: "Goro", ok: false },
  ];

  const rows = people.map(({ name }) => {
    return `
      <tr>
        <td>${name}</td>
        <td>
          <a class="btn" style="submit">選ぶ</a>
          <cwdb-action
            action="call"
            endpoint="${context.invokedFunctionArn}" 
            confirmation="本当に${name}を選びますか？">
            { "person": "${name}" }
          </cwdb-action>
        </td>
        </td>
      </tr>
    `;
  });

  if (person) {
    if (ok) {
      response = `${timestamp}: ${person}「着いたら連絡する」`;
    } else {
      response = `${timestamp}: ${person}「行けたら行く」`;
    }
    response += "\n" + JSON.stringify(event);
  }

  return `
    <div>
      <table>
        ${rows}
      </table>
      <p>${response}</p>
    </div>
  `;
};
