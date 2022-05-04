import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

describe("Submit feedback", () => {
  const submitFeedback = new SubmitFeedbackUseCase(
    { create: async () => {} },
    { sendMail: async () => {} }
  );

  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "comment example",
        screenshot: "data:image/png;base64,l;kajsdfasdf;lkajsdfasdf",
      })
    ).resolves.not.toThrow();
  });

  it("should not be able to submit a feedback without a type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "comment example",
        screenshot: "data:image/png;base64,l;kajsdfasdf;lkajsdfasdf",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without a comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,l;kajsdfasdf;lkajsdfasdf",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback with a invalid screenshot format", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "comment example",
        screenshot: "l;kajsdfasdf;lkajsdfasdf",
      })
    ).rejects.toThrow();
  });
});
