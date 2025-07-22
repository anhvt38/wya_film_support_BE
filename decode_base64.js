const base64String = "lrka/fD0FJwful9wPbtqlcf86hM0wtRnEXXokDEyLYZl7dXjmmTednLsifi/vnpb48qPebROeH5wvD4CKjMfoiD02LjjLO8KtGt6j8ZgY2BM4b4/7ITDTJ0lJ+6d";

try {
  // Decode Base64 to binary
  const binaryString = atob(base64String);
  
  console.log("Base64 decoded length:", binaryString.length);
  console.log("First 50 bytes as hex:");
  
  // Convert to hex for analysis
  let hexString = "";
  for (let i = 0; i < Math.min(50, binaryString.length); i++) {
    const hex = binaryString.charCodeAt(i).toString(16).padStart(2, '0');
    hexString += hex + " ";
  }
  console.log(hexString);
  
  // Try to interpret as different encodings
  console.log("\nTrying different interpretations:");
  
  // As UTF-8 text
  try {
    const utf8Text = new TextDecoder('utf-8').decode(new Uint8Array([...binaryString].map(c => c.charCodeAt(0))));
    console.log("As UTF-8:", utf8Text.substring(0, 100));
  } catch (e) {
    console.log("Not valid UTF-8");
  }
  
  // As ASCII
  try {
    const asciiText = [...binaryString].map(c => c.charCodeAt(0)).map(code => 
      code >= 32 && code <= 126 ? String.fromCharCode(code) : '.'
    ).join('');
    console.log("As ASCII:", asciiText.substring(0, 100));
  } catch (e) {
    console.log("ASCII conversion failed");
  }
  
  // Check if it's compressed data
  const firstBytes = [...binaryString.substring(0, 4)].map(c => c.charCodeAt(0));
  console.log("\nFirst 4 bytes:", firstBytes);
  
  // Common compression signatures
  if (firstBytes[0] === 0x1f && firstBytes[1] === 0x8b) {
    console.log("This appears to be GZIP compressed data");
  } else if (firstBytes[0] === 0x78 && (firstBytes[1] === 0x9c || firstBytes[1] === 0xda || firstBytes[1] === 0x01)) {
    console.log("This appears to be ZLIB compressed data");
  } else if (firstBytes[0] === 0x50 && firstBytes[1] === 0x4b) {
    console.log("This appears to be ZIP compressed data");
  } else {
    console.log("No common compression signature detected");
  }
  
} catch (error) {
  console.error("Error decoding Base64:", error.message);
} 