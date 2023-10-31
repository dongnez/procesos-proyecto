import nodemailer from "nodemailer";
const email = "gnez.developer@gmail.com";
const url = process.env.APP_URL || "http://localhost:3000/";

const transporter = nodemailer.createTransport({
  host: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: email,
    pass: "tjfn pyrv lwpd tosz",
  },
});

export const enviarEmail = async function (direccion, subject) {
  const result = await transporter.sendMail({
    from: email,
    to: direccion,
    subject: subject,
    text: "Pulsa aquí para confirmar cuenta",
    html:
	`
	<h2>Bienvenido a Shake It</h2>
	<br/>

	<p>Para confirmar tu cuenta pulsa en el siguiente enlace</p>
	<a href="${url}confirmarUsuario/">Pulsa aquí para confirmar cuenta</a>
	<br/>

	<p>Si no has sido tu, ignora este mensaje</p>
	`
	
  });

  return result;
};
