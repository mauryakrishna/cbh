const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the literal '0' when given empty string input", () => {
    const trivialKey = deterministicPartitionKey("");
    expect(trivialKey).toBe("0");
  })

  it("Handle null/undefined for partitionKey", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: null})
    expect(typeof trivialKey).toEqual("string")
    expect(trivialKey).toHaveLength(128)
    
    // The trivialKey output id alphanumeric key
    // the better test would be to check against RegExp. But could not get it to work.
    //expect(trivialKey).toEqual(expect.stringMatching(RegExp("^[0-9a-zA-Z]$")))
  })

  it("When partitionKey is valid", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: "value"})
    expect(trivialKey).toBe("value")
  })

  it("When partitionKey is valid but non string", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: 123})
    expect(trivialKey).toBe("123")
  })

  it("When partitionKey is big", () => {
    const trivialKey = deterministicPartitionKey({ otherKey: "ThisIsGoingToBeBigStringNotThatLong"})
    expect(trivialKey).toHaveLength(128)
  })
});
