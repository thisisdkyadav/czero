/**
 * CZero Test Configuration for Button Features
 * Testing: sizes, variants, states, custom variant
 */

export default {
  // Test 1: Custom button sizes (smaller than default)
  components: {
    button: {
      height: { sm: "1.5rem", md: "2rem", lg: "2.5rem" },
      paddingX: { sm: "0.5rem", md: "0.75rem", lg: "1rem" },
      gap: "0.25rem",
      
      // Test 2: Custom border radius (more rounded)
      borderRadius: "0.75rem",
      
      // Test 3: Custom states
      states: {
        hover: { opacity: "0.7" }, // More transparent on hover
        focus: { 
          ringWidth: "4px", // Thicker focus ring
          ringOffset: "3px",
        },
      },
      
      // Test 4: Custom variants
      variants: {
        // Override primary variant
        primary: {
          bg: "#3b82f6", // Blue-500
          color: "white",
          hover: { opacity: "0.8" },
        },
        // Add custom "success" variant
        success: {
          bg: "#10b981", // Green-500
          color: "white",
          borderColor: "transparent",
          hover: { opacity: "0.85" },
        },
        // Add custom "gradient" variant
        gradient: {
          bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderColor: "transparent",
        },
      },
    },
  },
};
