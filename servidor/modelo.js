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
}

function Usuario(nick) {
  this.nick = nick;
}

