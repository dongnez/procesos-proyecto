// import axios from 'axios';
import {useEffect} from 'react';
import { useAuth } from 'src/context/AuthProvider';
import {  databaseAuthGoogle } from 'src/database/databaseAuth';
// import { API_URL } from 'src/constants/config';

export const useOneTap = () => {
	const {saveUser} = useAuth();

	useEffect(() => {

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
			const jwt=info.credential;
 			const user=JSON.parse(atob(jwt.split(".")[1]));

			const email = user.email;
			const name = user.name;
			const photoURL = user.picture;

			databaseAuthGoogle({email,name,photoURL,provider:'google'}).then(async (res:any) => {
				//Call Register
				console.log("useOneTap CALLBACK", res.data.user);
				saveUser(res.data.user);
				window.location.href = "/app";
			})
			
		  },
		});
  
		google.accounts.id.prompt();
	  };

	  document.body.appendChild(script);
	}, []);
}