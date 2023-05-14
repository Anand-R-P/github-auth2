import { useEffect } from "react";
import { useState } from "react";

const App = () => {

  const[userrname, setUsername] = useState("no name");
  const [pic, setPic] = useState("https://media.licdn.com/dms/image/C5603AQHlB0zOdusIJw/profile-displayphoto-shrink_100_100/0/1667975612954?e=1689206400&v=beta&t=FPSgvbt9MWV3Ypaaaa328Vo46NA5uYZGzaKS5Nbe6zY");
  let params =  new URLSearchParams(window.location.search);
  let code = params.get('code');

  console.log('code',code)
  useEffect(() => {
    if (code) {
      fetch(`http://localhost:3000/getAccessToken?code=${code}`)
      .then(res => res.json())
      .then(result => {
        setUsername(result.data.name)
        setPic(result.data.avatar_url);
      })
    }
  },[])

  const CLIENT_ID = import.meta.env.VITE_GIT_HUB_CLIENT_ID;
  const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`;

  return (
    <div>
      <a href={url}>
        <button> login with git hub</button>
      </a>
      <h1> {userrname} </h1>
      <img alt="pc"   src={pic} />
    </div>
  );
};
export default App;
