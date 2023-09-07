const fields = require("./fieldsHelper");

describe("firstName middleNames validation fields test", () => {
  it("should be false when first and middle name combined greater than 30 characters", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: "jjjjjjjjjjjjjjjjjjjjj",
        middleNames: "jjjjjjjjjj",
      },
    });

    expect(validator(1, 30, "firstName", "middleNames")).to.be.false;
  });

  it("should be true when first and middle name combined less or equal to 30 characters", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: "jjjjjjjjjjjj",
        middleNames: "jjjjjjjjjj",
      },
    });

    expect(validator(1, 30, "firstName", "middleNames")).to.be.true;
  });

  it("should be false when firstname is only entered and is over 30 characters", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
      },
    });

    expect(validator(1, 30, "firstName", "middleNames")).to.be.false;
  });

  it("should be true when firstName is null but middleNames is valid", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: undefined,
        middleNames: "jjjj",
      },
    });

    expect(validator(1, 30, "firstName", "middleNames")).to.be.true;
  });

  it("should be true when middleNames is null but firstName is valid", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: "jjjj",
        middleNames: undefined,
      },
    });

    expect(validator(1, 30, "firstName", "middleNames")).to.be.true;
  });

  it("should be false when combined name is 0 characters", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: "",
        middleNames: "",
      },
    });

    expect(validator(1, 30, "firstName", "middleNames")).to.be.false;
  });
});

describe("expiryDate validation fields test", () => {
  it("should be true when expiryDate is 1 Year in the future", () => {
    const validator = fields.expiryDateValidator.bind({
      values: {
        expiryDate: new Date(
          new Date().getFullYear() + 1,
          new Date().getMonth(),
          new Date().getDate()
        ),
      },
    });

    expect(validator(1, 18, "expiryDate")).to.be.true;
  });

  it("should be true when expiryDate is 1 month in the future", () => {
    const validator = fields.expiryDateValidator.bind({
      values: {
        expiryDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          new Date().getDate()
        ),
      },
    });

    expect(validator(1, 18, "expiryDate")).to.be.true;
  });

  it("should be true when expiryDate is today", () => {
    const validator = fields.expiryDateValidator.bind({
      values: {
        expiryDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        ),
      },
    });

    expect(validator(1, 18, "expiryDate")).to.be.true;
  });

  it("should be true when expiryDate is 17 months in the past", () => {
    const validator = fields.expiryDateValidator.bind({
      values: {
        expiryDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 17,
          new Date().getDate()
        ),
      },
    });

    expect(validator(1, 18, "expiryDate")).to.be.true;
  });

  it("should be true when expiryDate is 18 months in the past", () => {
    const validator = fields.expiryDateValidator.bind({
      values: {
        expiryDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 18,
          new Date().getDate()
        ),
      },
    });

    expect(validator(1, 18, "expiryDate")).to.be.true;
  });

  it("should be false when expiryDate is 19 months in the past", () => {
    const validator = fields.expiryDateValidator.bind({
      values: {
        expiryDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 19,
          new Date().getDate()
        ),
      },
    });

    expect(validator(1, 18, "expiryDate")).to.be.false;
  });

  it("should be false when expiryDate is 20 months in the past", () => {
    const validator = fields.expiryDateValidator.bind({
      values: {
        expiryDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth() - 20,
          new Date().getDate()
        ),
      },
    });

    expect(validator(1, 18, "expiryDate")).to.be.false;
  });

  it("should be false when expiryDate is 2 Years in the past", () => {
    const validator = fields.expiryDateValidator.bind({
      values: {
        expiryDate: new Date(
          new Date().getFullYear() - 2,
          new Date().getMonth(),
          new Date().getDate()
        ),
      },
    });

    expect(validator(1, 18, "expiryDate")).to.be.false;
  });
});
