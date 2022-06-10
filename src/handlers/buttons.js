module.exports = async (client, PG, Ascii) => {
  const Table = new Ascii("Bottoni caricati");
  const buttonFolder = await PG(`${process.cwd()}/buttons/**/*js`);

  buttonFolder.map(async (file) => {
    const buttonFile = require(file);

    if (!buttonFile.id) {
      return;
    }

    client.buttons.set(buttonFile.id, buttonFile);

    Table.addRow(buttonFile.id, "CARICATO");
  });
  console.log(Table.toString());
};
