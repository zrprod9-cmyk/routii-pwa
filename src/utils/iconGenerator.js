/**
 * AI Icon Generator for Routii PWA
 * 
 * MVP Implementation: Mock with 2-second delay
 * 
 * TODO: Production implementation options:
 * 1. Vercel Serverless Function calling nano-banana-pro CLI
 * 2. OpenClaw Gateway endpoint (if exposed as API)
 * 3. Direct WaveSpeed API (requires backend for API key security)
 * 
 * Production endpoint should:
 * - Accept image file + activityName
 * - Call: openclaw nano-banana-pro.generate --image <file> --prompt <prompt>
 * - Return generated image blob
 */

/**
 * Generate a custom icon using AI
 * @param {File} imageFile - User-uploaded image file
 * @param {string} activityName - Name of the activity for prompt context
 * @returns {Promise<string|null>} - Object URL of generated image, or null if failed
 */
export const generateIcon = async (imageFile, activityName) => {
  // TODO: Replace with actual API call in production
  
  console.log('Generating icon for:', activityName, 'with image:', imageFile.name);
  
  // Simulate API delay (2 seconds)
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock: return placeholder image
  // In production, this would be the generated image from WaveSpeed API
  return 'https://via.placeholder.com/150/F4A261/4A3F35?text=AI+Icon';
};

/**
 * Convert file to data URL for storage
 * @param {File} file - Image file
 * @returns {Promise<string>} - Data URL
 */
export const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Validate image file
 * @param {File} file - File to validate
 * @returns {Object} - { valid: boolean, error?: string }
 */
export const validateImageFile = (file) => {
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }
  
  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Please upload a JPG, PNG, or WebP image' };
  }
  
  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    return { valid: false, error: 'Image must be smaller than 5MB' };
  }
  
  return { valid: true };
};
