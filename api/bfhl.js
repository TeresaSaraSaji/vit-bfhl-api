// api/bfhl.js (Vercel Serverless Function - Node.js / CommonJS)

module.exports = (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed. Use POST /bfhl" });
  }

  try {
    const body = req.body || {};
    const data = body.data;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. Body must be JSON with an array field 'data'."
      });
    }

    // 🔁 EDIT THESE FOUR LINES WITH **YOUR** DETAILS
    const FULL_NAME_LOWERCASE = "your_full_name_in_lowercase"; // e.g., "john_doe"
    const DOB_DDMMYYYY = "17091999";                            // e.g., "17091999"
    const EMAIL = "your_email@domain.com";                      // e.g., "john@xyz.com"
    const ROLL_NUMBER = "YOURROLL123";                          // e.g., "ABCD123"

    const user_id = `${FULL_NAME_LOWERCASE}_${DOB_DDMMYYYY}`;

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];

    let sum = 0;

    const isIntegerString = (s) => /^-?\d+$/.test(s);
    const isAlphaString = (s) => /^[A-Za-z]+$/.test(s);

    for (const item of data) {
      // Normalize everything to a string for decisions & output
      const str = (typeof item === "string") ? item.trim() : String(item);

      if (
        (typeof item === "number" && Number.isInteger(item)) ||
        (typeof item === "string" && isIntegerString(str))
      ) {
        const num = (typeof item === "number") ? item : parseInt(str, 10);
        const isEven = Math.abs(num) % 2 === 0;

        if (isEven) even_numbers.push(String(num));
        else odd_numbers.push(String(num));

        sum += num;
      } else if (typeof item === "string" && isAlphaString(str)) {
        // Push UPPERCASE word to alphabets array
        alphabets.push(str.toUpperCase());
      } else {
        // Everything else goes to special characters as-is (stringified if object)
        special_characters.push(
          typeof item === "string" ? item : JSON.stringify(item)
        );
      }
    }

    // Build concat_string: all alphabetic chars, reversed, alternating caps (Upper, lower, Upper, ...)
    const concat_string = alphabets
      .join("")           // concatenate all words
      .split("")          // to characters
      .reverse()          // reverse order
      .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,              // already uppercase
      special_characters,
      sum: String(sum),       // sum must be a string
      concat_string
    });
  } catch (err) {
    return res.status(500).json({
      is_success: false,
      message: "Server Error",
    });
  }
};
