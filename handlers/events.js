const { readdirSync } = require("fs");

const ascii = require("ascii-table");


let table = new ascii("Events");
table.setHeading("Events", "Load status");

module.exports = (client) => {

  const commands = readdirSync(`./events/`).filter(file => file.endsWith(".js"));

  for (let file of commands) {

    try {
    let pull = require(`../events/${file}`);

    if (pull.event && typeof pull.event !== "string") {
      table.addRow(file, `❌ -> Property event should be string.`);
      continue;
    }

    pull.event = pull.event || file.replace(".js", "")

    client.on(pull.event, pull.run.bind(null, client))

    table.addRow(file, '✅');

    } catch(err) {

  console.log("Error While loading/executing command")
  console.log(err)
  table.addRow(file, `❌ -> Error while loading event`);
    }
  }

   console.log(table.toString());
}