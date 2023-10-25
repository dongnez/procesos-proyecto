import {useEffect} from 'react';
import {  databaseEnviarJWT } from 'src/database/databaseClaseFunctions';

export const useOneTap = (user:any) => {
	useEffect(() => {
	  if(user) return;


	  const script = document.createElement("script");
	  script.src = "https://accounts.google.com/gsi/client";
	  script.async = true;
	  script.defer = true;
	  script.onload = () => {
		console.log("useOneTap LOAD");
		const google:any = (window as any).google;
		google.accounts.id.initialize({
		  client_id:
			"81496513072-viqtt5v8o82n8070vfknm9jqlq542nrg.apps.googleusercontent.com", //prod
		  auto_select: false,
		  callback: (info:any) => {
			let jwt=info.credential;
 			// let user=JSON.parse(atob(jwt.split(".")[1]));


			databaseEnviarJWT({"jwt":jwt}).then((res:any) => {
				console.log("useOneTap CALLBACK", res);

				window.location.href = "/app";
			})
			
		  },
		});
  
		google.accounts.id.prompt();
	  };

	  document.body.appendChild(script);
	}, [user]);
}