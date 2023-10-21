import  {CAD}  from "./cad.js";

export function Sistema() {
  this.usuarios = {};

  this.agregarUsuario = async function (nick) {
    this.usuarios[nick] = new Usuario(nick);

    await this.cad.buscarOCrearUsuario(nick,(usuario) => {
      console.log("Usuario creado");
    });

	  return this.usuarios
  };

  this.obtenerUsuarios=function(){
 	  return this.usuarios;
  };

  this.buscarOCrearUsuario = function (email, callback) {
    console.log("Creado usuario", email)
    this.cad.buscarOCrearUsuario(email,function(obj){
      callback(obj);
    });
  }

  this.deleteUsuario= function (nick){
	delete this.usuarios[nick]
  };

  this.usuarioActivo = function (nick){
    //True if nick is in use
    return this.usuarios[nick] ? true : false; 
  };

  this.cad = new CAD();

  this.cad.conectar();
}

function Usuario(nick) {
  this.nick = nick;
}

