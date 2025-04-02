export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nombre, telefono, correo } = req.body;

    const response = await fetch("https://script.google.com/macros/s/AKfycbyw4zB0lKx30-8j6oQWRPdFhxMjtuGB9Ju7Hf_74gvPtkacjSarPmvie2zZoeyJVJ4P/exec", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, telefono, correo }),
    });

    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
