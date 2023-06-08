const HttpError = require("./models/http-error");

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
      throw new HttpError("Failed to save. Please try again.", 500);
    }
    return createdItem;
  };

  //read
  get = async () => {
    let allData;
    try {
      allData = await this.Schema.find({}, "-password").exec();
    } catch (err) {
      throw new HttpError("Failed to get data. Please try again.", 500);
    }
    return allData;
  };

  getById = async (id) => {
    let item;
    try {
      item = await this.Schema.findById(id);
    } catch (err) {
      throw new HttpError("Failed to get data. Please try again.", 500);
    }
    return item;
  };

  getByUserId = async (userId) => {
    let itemsArray;
    try {
      itemsArray = await this.Schema.find({ userId: userId });
    } catch (err) {
      throw new HttpError("Failed to get data. Please try again.", 500);
    }
    return itemsArray;
  };

  find = async (filter) => {
    try {
      const queriedItem = await this.Schema.findOne(filter);
      return queriedItem;
    } catch (err) {
      throw new HttpError("Failed to find data. Please try again.", 500);
    }
  };

  findMany = async (filter) => {
    try {
      const queriedItems = await this.Schema.find(filter);
      return queriedItems;
    } catch (err) {
      throw new HttpError("Failed to find data. Please try again.", 500);
    }
  };

  //update
  update = async (id) => {
    let doc;
    try {
      doc = await this.Schema.findById(id);
    } catch (err) {
      throw new HttpError("Could not find the document.", 404);
    }
    const save = () => {
      try {
        doc.save({
          validateModifiedOnly: true,
        });
      } catch (err) {
        throw new HttpError("Failed to save the document. Please try again.", 500);
      }
    };

    return { doc, save };
  };

  //delete
  del = async (id) => {
    const doc = await this.Schema.findById(id);
    try {
      await doc.remove();
    } catch (err) {
      throw new HttpError("Could not delete item.", 500);
    }
  };
}

module.exports = DB;
