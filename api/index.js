export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Manejar la solicitud OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { nombre, telefono, correo } = req.body;

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbyw4zB0lKx30-8j6oQWRPdFhxMjtuGB9Ju7Hf_74gvPtkacjSarPmvie2zZoeyJVJ4P/exec", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, telefono, correo }),
      });

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Error al enviar datos al Apps Script' });
    }
  }

  res.setHeader("Allow", ["POST", "OPTIONS"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
