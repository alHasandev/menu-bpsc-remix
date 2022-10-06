import { GoogleSpreadsheet } from "google-spreadsheet";

// Initialize the sheet - doc ID is the long id in the sheets URL
export const doc = new GoogleSpreadsheet(
  "11A6MU3xfn5Ds_JAHPasMXJJtwFd7REU_t1mOZj62Hk8"
);

export const getItems = async () => {
  doc.useApiKey("AIzaSyC-No9k-dzClcP3qELJbkszkTZZMXGheLQ");
  await doc.loadInfo();
  const itemsDataset = doc.sheetsByTitle["dataset_items"];

  const rows = await itemsDataset.getRows();
  return rows.map((row) => {
    return {
      id: row.id,
      name: row.name,
      price: row.price,
      category: row.category,
      stock: row.stock,
    };
  });
};
