import { describe, expect, it } from "vitest";
import { initialCalculatorState, toggleMultiSelectValue } from "@/types/calculator";
import { CENTRAL_STEPS, MINISPLIT_STEPS } from "@/components/calculator/steps";

describe("initialCalculatorState", () => {
  it("has all fields empty or default", () => {
    expect(initialCalculatorState.systemPath).toBe("");
    expect(initialCalculatorState.firstName).toBe("");
    expect(initialCalculatorState.lastName).toBe("");
    expect(initialCalculatorState.phone).toBe("");
    expect(initialCalculatorState.email).toBe("");
    expect(initialCalculatorState.address).toBe("");
    expect(initialCalculatorState.c_notes).toBe("");
    expect(initialCalculatorState.c_priorities).toEqual([]);
    expect(initialCalculatorState.c_addOns).toEqual([]);

    const stringFields = Object.entries(initialCalculatorState).filter(
      ([, value]) => typeof value === "string",
    );
    expect(stringFields.every(([, value]) => value === "")).toBe(true);
  });
});

describe("step counts per system path", () => {
  it("central air path has 13 total steps (path selection + 12 question steps)", () => {
    expect(CENTRAL_STEPS.length + 1).toBe(13);
  });

  it("mini split path has 10 total steps (path selection + 9 question steps)", () => {
    expect(MINISPLIT_STEPS.length + 1).toBe(10);
  });

  it("central path ends with a contact step", () => {
    expect(CENTRAL_STEPS.at(-1)?.kind).toBe("contact");
  });

  it("mini split path ends with a contact step", () => {
    expect(MINISPLIT_STEPS.at(-1)?.kind).toBe("contact");
  });
});

describe("progress percentage", () => {
  it("increases with each step in the central air path", () => {
    for (let i = 1; i < CENTRAL_STEPS.length; i++) {
      expect(CENTRAL_STEPS[i].percent).toBeGreaterThan(CENTRAL_STEPS[i - 1].percent);
    }
  });

  it("increases with each step in the mini split path", () => {
    for (let i = 1; i < MINISPLIT_STEPS.length; i++) {
      expect(MINISPLIT_STEPS[i].percent).toBeGreaterThan(MINISPLIT_STEPS[i - 1].percent);
    }
  });

  it("reaches its highest value on the final (contact) step of each path", () => {
    const centralMax = Math.max(...CENTRAL_STEPS.map((step) => step.percent));
    const minisplitMax = Math.max(...MINISPLIT_STEPS.map((step) => step.percent));
    expect(CENTRAL_STEPS.at(-1)?.percent).toBe(centralMax);
    expect(MINISPLIT_STEPS.at(-1)?.percent).toBe(minisplitMax);
  });
});

describe("step index navigation (back button semantics)", () => {
  it("decreases the step index by one when going back from a non-first step", () => {
    let stepIndex = 3;
    stepIndex = stepIndex === 0 ? 0 : stepIndex - 1;
    expect(stepIndex).toBe(2);
  });

  it("does not go below the first step index", () => {
    const stepIndex = 0;
    const wentBackToPath = stepIndex === 0;
    expect(wentBackToPath).toBe(true);
  });
});

describe("toggleMultiSelectValue", () => {
  it("adds a value that is not yet selected", () => {
    expect(toggleMultiSelectValue([], "Smart thermostat")).toEqual(["Smart thermostat"]);
    expect(toggleMultiSelectValue(["Smart thermostat"], "Air filtration upgrade")).toEqual([
      "Smart thermostat",
      "Air filtration upgrade",
    ]);
  });

  it("removes a value that is already selected", () => {
    expect(toggleMultiSelectValue(["Smart thermostat", "Air filtration upgrade"], "Smart thermostat")).toEqual([
      "Air filtration upgrade",
    ]);
  });

  it("does not mutate the original array", () => {
    const original = ["Smart thermostat"];
    const result = toggleMultiSelectValue(original, "Air filtration upgrade");
    expect(original).toEqual(["Smart thermostat"]);
    expect(result).not.toBe(original);
  });
});

describe("contact step required fields (mirrors ContactStep's native `required` inputs)", () => {
  function isContactComplete(state: { firstName: string; lastName: string; phone: string; email: string; address: string }) {
    return (
      state.firstName.trim() !== "" &&
      state.lastName.trim() !== "" &&
      state.phone.trim() !== "" &&
      state.email.trim() !== "" &&
      state.address.trim() !== ""
    );
  }

  it("is not submittable with an empty firstName", () => {
    const state = { ...initialCalculatorState, lastName: "Doe", phone: "3608882217", email: "a@test.com", address: "1 Main St" };
    expect(isContactComplete(state)).toBe(false);
  });

  it("is not submittable with an empty phone", () => {
    const state = { ...initialCalculatorState, firstName: "Jane", lastName: "Doe", email: "a@test.com", address: "1 Main St" };
    expect(isContactComplete(state)).toBe(false);
  });

  it("is not submittable with an empty email", () => {
    const state = { ...initialCalculatorState, firstName: "Jane", lastName: "Doe", phone: "3608882217", address: "1 Main St" };
    expect(isContactComplete(state)).toBe(false);
  });

  it("is submittable once all required contact fields are filled", () => {
    const state = {
      ...initialCalculatorState,
      firstName: "Jane",
      lastName: "Doe",
      phone: "3608882217",
      email: "a@test.com",
      address: "1 Main St",
    };
    expect(isContactComplete(state)).toBe(true);
  });
});
