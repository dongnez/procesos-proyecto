import nodemailer from "nodemailer";
const email = "jimenezjimenezguillermo@gmail.com";
const url = process.env.APP_URL || "http://localhost:8080/";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: "qgnh fjlo nbeg alth",
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
	<a href="${url}/auth/confirmarUsuario/${direccion}/${key}">Pulsa aquí para confirmar cuenta</a>
	<br/>

	<p>Si no has sido tu, ignora este mensaje</p>
	`
  });

  return result;
};
