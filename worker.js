export default {
  async fetch(request) {
    let url = new URL(request.url);
    let target = url.searchParams.get("url");
    if (!target) {
      return new Response("Missing URL parameter", { status: 400 });
    }
    
    try {
      let response = await fetch(target, {
        headers: { "User-Agent": "Mozilla/5.0" },
        redirect: "follow", // Allows redirects
      });
      
      // Set headers to allow embedding in an iframe
      const headers = new Headers(response.headers);
      headers.set('X-Frame-Options', 'ALLOWALL'); // Allow iframe embedding
      headers.set('Content-Security-Policy', "frame-ancestors 'self' *"); // Allow embedding from anywhere
      
      return new Response(response.body, { 
        status: response.status,
        headers: headers 
      });
    } catch (error) {
      return new Response("Failed to fetch the requested URL. Please check if the website is accessible.", { 
        status: 500 
      });
    }
  }
};
