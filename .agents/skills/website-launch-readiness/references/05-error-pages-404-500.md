# Pillar 5: Adding Error Pages (404, 500) (51:19)

A default browser error page (like a blank white screen with `404 Not Found - nginx/1.18.0`) causes over 90% of lost visitors to immediately hit the back button and abandon the site forever.

A custom branded error page keeps the user inside your brand ecosystem, reassures them with empathetic messaging, and directs them back to high-converting pages.

---

## 1. UX Principles for 404 & 500 Pages

### The 404 "Page Not Found" Formula
1. **Empathetic, Brand-Aligned Headline**:
   - Dance Site: *"Oops! Looks like we danced our way to a dead end."*
   - Dog Training: *"Looks like this dog wandered off the leash!"*
   - General Business: *"We couldn't find the page you were looking for."*
2. **Clear Explanation**:
   - Mention that the URL might be mistyped, moved, or deleted.
3. **Primary Recovery Action**:
   - A bold, high-contrast button: **"Back to Homepage"**.
4. **Quick Navigation Links**:
   - Direct shortcuts to popular sections: *Classes / Services*, *FAQs*, *About Us*, *Contact Us*.
5. **No Broken Layouts**:
   - Keep the main navigation header and footer intact so the user can easily jump anywhere else on the site.

### The 500 "Internal Server Error" Formula
1. **Reassurance**:
   - Clearly state that the fault is on our end, not their computer or internet connection.
2. **Recovery Actions**:
   - **"Reload Page"** button (`onclick="window.location.reload()"`).
   - **"Contact Support"** or **"Report Issue"** link.

---

## 2. HTTP Status Code Best Practices (Avoiding "Soft 404s")

Search engines penalize sites that serve "Soft 404s" (where a page displays an error message to human users but returns an `HTTP 200 OK` status code to the search bot).

- **Static Builds (Astro SSG / HTML)**:
  - Ensure the hosting platform (Netlify, Vercel, Cloudflare, Apache, Nginx) is configured to return a true `404` status header when serving `404.html`.
- **Server Side Rendering (Astro SSR / Next.js / Express)**:
  - Set the HTTP response status to `404` explicitly:
    ```javascript
    // Astro SSR page header
    export const prerender = false;
    Astro.response.status = 404;
    Astro.response.statusText = 'Not Found';
    ```

---

## 3. Hosting Platform Configurations

### Netlify
- Netlify automatically serves any file named `404.html` in your publish directory (`dist/404.html`) with a `404` status code.
- If you have an Astro site, building `src/pages/404.astro` automatically outputs `dist/404.html`.

### Vercel
- Automatically detects `404.html` in the build output.
- For custom rewrites, add to `vercel.json`:
  ```json
  {
    "cleanUrls": true,
    "trailingSlash": false
  }
  ```

### Apache (`.htaccess`)
Place this at the root of your public web directory:
```apache
ErrorDocument 404 /404.html
ErrorDocument 500 /500.html
```

### Nginx
In your server block configuration:
```nginx
server {
    ...
    error_page 404 /404.html;
    location = /404.html {
        internal;
    }

    error_page 500 502 503 504 /500.html;
    location = /500.html {
        internal;
    }
}
```

---

## 4. Ready-to-Use Templates

- **Astro 404 Page**: [templates/pages/404.astro](../templates/pages/404.astro)
- **Astro 500 Page**: [templates/pages/500.astro](../templates/pages/500.astro)
- **Vanilla HTML 404**: [templates/pages/404.html](../templates/pages/404.html)
- **Vanilla HTML 500**: [templates/pages/500.html](../templates/pages/500.html)
