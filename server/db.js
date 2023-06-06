class DB {
  constructor(Schema) {
    this.Schema = Schema;
  }

  //create
  add = async (object) => {
    const createdItem = new this.Schema({ ...object });
    try {
      await createdItem.save();
    } catch (err) {
      console.error(err);
      return { message: "Failed to save. Please try again." };
    }
    return createdItem;
  };

  //read
  get = async () => {
    let allData;
    try {
      allData = await this.Schema.find({}, "-password").exec();
    } catch (err) {
      console.error(err);
      return { message: "Failed to get data. Please try again." };
    }
    return allData;
  };

  getById = async (id) => {
    let item;
    try {
      item = await this.Schema.findById(id);
    } catch (err) {
      console.error(err);
      return { message: "Failed to get data. Please try again." };
    }
    return item;
  };

  getByUserId = async (userId) => {
    let itemsArray;
    try {
      itemsArray = await this.Schema.find({ userId: userId });
    } catch (err) {
      console.error(err);
      return { message: "Failed to get data. Please try again." };
    }
    return itemsArray;
  };

  find = async (filter) => {
    try {
      const queriedItem = await this.Schema.findOne(filter);
      return queriedItem;
    } catch (err) {
      console.error(err);
      return { message: "Failed to find data. Please try again." };
    }
  };

  findMany = async (filter) => {
    try {
      const queriedItems = await this.Schema.find(filter);
      return queriedItems;
    } catch (err) {
      console.error(err);
      return { message: "Failed to find data. Please try again." };
    }
  };

  //update
  update = async (id) => {
    console.log("id", id);
    let doc;
    try {
      doc = await this.Schema.findById(id);
    } catch (err) {
      console.error(err);
      return { message: "Could not find the document." };
    }
    const callback = () => {
      try {
        doc.save({
          validateModifiedOnly: true,
        });
      } catch (err) {
        console.error(err);
        return { message: "Failed to save the document. Please try again." };
      }
    };

    return { doc: doc, save: callback };
  };

  //delete
  del = async (id) => {
    const doc = await this.Schema.findById(id);
    try {
      await doc.remove();
    } catch (err) {
      console.error(err);
      return { message: "Could not delete item." };
    }
  };
}

module.exports = DB;
