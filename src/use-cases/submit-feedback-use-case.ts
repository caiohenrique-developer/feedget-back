import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute({ type, comment, screenshot }: SubmitFeedbackUseCaseRequest) {
    if (!type) {
      throw new Error("Type is required");
    }

    if (!comment) {
      throw new Error("Comment is required");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Screenshot must be a base64 encoded image");
    }

    await this.feedbacksRepository.create({ type, comment, screenshot });

    await this.mailAdapter.sendMail({
      subject: "Feedback do usuário",
      body: `
        <body style="font-family: sans-serif;">
          <div style="display: block; margin: auto; max-width: 600px;" class="main">
            <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Congrats for sending test email with Mailtrap!</h1>
            <p>Inspect it using the tabs you see above and learn how this email can be improved.</p>
            <h4>Tipo do feedback: ${type}</h4>
            <p>Mensagem: ${comment}</p>
            <p>Imagem de screenshot: ${screenshot}</p>
            <img alt="Inspect with Tabs" src="https://assets-examples.mailtrap.io/integration-examples/welcome.png" style="width: 100%;">
            <p>Now send your email using our fake SMTP server and integration of your choice!</p>
            <p>Good luck! Hope it works.</p>
          </div>
          <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
          <style>
            .main { background-color: white; }
            a:hover { border-left-width: 1em; min-height: 2em; }
          </style>
        </body>
      `,
    });
  }
}
