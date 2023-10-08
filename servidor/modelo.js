export function Sistema() {
  this.usuarios = {};

  this.agregarUsuario = function (nick) {
    this.usuarios[nick] = new Usuario(nick);

	return this.usuarios
  };

  this.obtenerUsuarios=function(){
 	  return this.usuarios;
  };

  this.deleteUsuario= function (nick){
	delete this.usuarios[nick]
  };

  this.usuarioActivo= function (nick){
    //True if nick is in use
    return this.usuarios[nick] ? true : false; 
  };
}

function Usuario(nick) {
  this.nick = nick;
}

