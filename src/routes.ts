import express from "express";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";

export const routes = express.Router();

// const transport = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "58f6add4bbccdf",
//     pass: "479e01aff07f7f",
//   },
// });

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbacksRepository();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository
  );

  await submitFeedbackUseCase.execute({ type, comment, screenshot });

  //   await transport.sendMail({
  //     from: "Equipe FeedGet <oi@feedget.com>",
  //     to: "Caio Henrique <caiohenrique.developer@gmail.com>",
  //     subject: "New feedback",
  //     text: `New feedback type: ${feedback.type}`,
  //     html: `
  //         <body style="font-family: sans-serif;">
  //           <div style="display: block; margin: auto; max-width: 600px;" class="main">
  //             <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Congrats for sending test email with Mailtrap!</h1>
  //             <p>Inspect it using the tabs you see above and learn how this email can be improved.</p>
  //             <h4>Tipo do feedback: ${feedback.type}</h4>
  //             <p>Mensagem: ${feedback.comment}</p>
  //             <p>Imagem de screenshot: ${feedback.screenshot}</p>
  //             <img alt="Inspect with Tabs" src="https://assets-examples.mailtrap.io/integration-examples/welcome.png" style="width: 100%;">
  //             <p>Now send your email using our fake SMTP server and integration of your choice!</p>
  //             <p>Good luck! Hope it works.</p>
  //           </div>
  //           <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
  //           <style>
  //             .main { background-color: white; }
  //             a:hover { border-left-width: 1em; min-height: 2em; }
  //           </style>
  //         </body>
  //       `,
  //   });

  return res.status(201).send();
});
