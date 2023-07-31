const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "This field is required  name",
    },
    image: {
      type: "string",
      required: "This field is required  image",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("category", categorySchema);
