// api/bfhl.js (Vercel Serverless Function - Node.js / ESM)
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method Not Allowed. Use POST /bfhl" });
  }

  try {
    const body = req.body || {};
    const data = body.data;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message:
          "Invalid input. Body must be JSON with an array field 'data'.",
      });
    }

    // 🔁 EDIT WITH YOUR DETAILS
    const FULL_NAME_LOWERCASE = "your_full_name_in_lowercase";
    const DOB_DDMMYYYY = "17091999";
    const EMAIL = "your_email@domain.com";
    const ROLL_NUMBER = "YOURROLL123";

    const user_id = `${FULL_NAME_LOWERCASE}_${DOB_DDMMYYYY}`;

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];

    let sum = 0;

    const isIntegerString = (s) => /^-?\d+$/.test(s);
    const isAlphaString = (s) => /^[A-Za-z]+$/.test(s);

    for (const item of data) {
      const str =
        typeof item === "string" ? item.trim() : String(item);

      if (
        (typeof item === "number" && Number.isInteger(item)) ||
        (typeof item === "string" && isIntegerString(str))
      ) {
        const num =
          typeof item === "number" ? item : parseInt(str, 10);
        const isEven = Math.abs(num) % 2 === 0;

        if (isEven) even_numbers.push(String(num));
        else odd_numbers.push(String(num));

        sum += num;
      } else if (typeof item === "string" && isAlphaString(str)) {
        alphabets.push(str.toUpperCase());
      } else {
        special_characters.push(
          typeof item === "string" ? item : JSON.stringify(item)
        );
      }
    }

    const concat_string = alphabets
      .join("")
      .split("")
      .reverse()
      .map((ch, idx) =>
        idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
      )
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ is_success: false, message: "Server Error" });
  }
}
