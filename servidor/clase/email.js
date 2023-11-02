import nodemailer from "nodemailer";
const email = "gnez.developer@gmail.com";
const url = process.env.APP_URL || "http://localhost:3000/";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: "tjfn pyrv lwpd tosz",
  },
});

export const enviarEmail = async function (direccion, key, subject) {
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
	<a href="${url}confirmarUsuario/${direccion}/${key}">Pulsa aquí para confirmar cuenta</a>
	<br/>

	<p>Si no has sido tu, ignora este mensaje</p>
	`
  });

  return result;
};
