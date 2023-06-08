const mongooseErrorHandle = (error, res) => {
  const mongooseErrorMessage = error.message;

  if (mongooseErrorMessage.toLowerCase().includes("validation")) {
    const startIndex = mongooseErrorMessage.indexOf(":");
    const customMessage = mongooseErrorMessage.slice(startIndex + 1).split(",");
    // remove extra space
    const customMessageArray = customMessage.map((element) => element.trim());
    // formatted error message to object
    const finalMessage = customMessageArray.reduce((obj, text) => {
      const targetPoint = text.indexOf(":");
      const property = text.slice(0, targetPoint);
      const msg = text.slice(targetPoint + 2);
      return { ...obj, [property]: msg };
    }, {});

    res.status(400).json({
      status: "fail",
      message: finalMessage,
    });
  } else if (mongooseErrorMessage.toLowerCase().includes("duplicate")) {
    const startIndex = mongooseErrorMessage.indexOf("{");
    const sliceMessage = mongooseErrorMessage.slice(startIndex + 1).split(":");
    const uniqueField = sliceMessage[0].trim();

    res.status(400).json({
      status: "fail",
      message: `${uniqueField} is already exists`,
    });
  } else {
    res.status(500).json({
      status: "fail",
      message: mongooseErrorMessage,
    });
  }
};

module.exports = mongooseErrorHandle;
