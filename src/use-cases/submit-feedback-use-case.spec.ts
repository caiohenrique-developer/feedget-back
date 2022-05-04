import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

describe("Submit feedback", () => {
  const createFeedbackSpy = jest.fn();
  const sendMailSpy = jest.fn();

  const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
  );

  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "comment example",
        screenshot: "data:image/png;base64,l;kajsdfasdf;lkajsdfasdf",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
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
