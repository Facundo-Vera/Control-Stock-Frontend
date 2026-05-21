const url = import.meta.env.VITE_API_URL;


const logIn = async (email, password) => {
  const response = await fetch(url + "login", {
    method: "POST",
     credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return data;
};

export { logIn };