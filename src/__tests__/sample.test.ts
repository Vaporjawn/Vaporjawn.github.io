// Simple example test to verify Jest is working
describe("Sample Tests", () => {
  it("should pass a basic test", () => {
    expect(1 + 1).toBe(2);
  });

  it("should handle string operations", () => {
    const name = "Victor Williams";
    expect(name).toContain("Victor");
    expect(name).toHaveLength(15);
  });

  it("should handle array operations", () => {
    const skills = ["React", "TypeScript", "JavaScript"];
    expect(skills).toHaveLength(3);
    expect(skills).toContain("React");
  });
});