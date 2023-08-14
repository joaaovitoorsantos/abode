import nodemailer from 'nodemailer'

export default async (req: unknown, res: unknown) => {
  if (req.method === 'POST') {
    // Configurar o transporte de e-mail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'joaaovitoorsantos@gmail.com',
        pass: 'sbtbrasil1',
      },
    })

    // Opções de e-mail
    const mailOptions = {
      from: 'claudelino2911@gmail.com',
      to: req.body.to,
      subject: 'Notificação',
      text: 'Aqui está a sua notificação!',
    }

    // Enviar o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
        res.status(500).send(error)
      } else {
        console.log('Email enviado: ' + info.response)
        res.status(200).send('E-mail enviado com sucesso!')
      }
    })
  } else {
    res.status(405).end() // Método não permitido
  }
}
