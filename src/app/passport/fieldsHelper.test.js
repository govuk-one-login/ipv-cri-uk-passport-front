const fields = require("./fieldsHelper");

describe("custom validation fields test", () => {
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
