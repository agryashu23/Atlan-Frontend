# AI Model Web Application

## Overview

This project is an AI model web application that allows users to explore, learn about, and create various AI models. It features a user-friendly interface with a homepage that includes a "Get Started" button, an explore page showcasing all AI models (including featured ones), a detailed model page for learning about specific models, and a page for creating new AI models.

## Technology Stack

- **JavaScript Framework:** React.js
- **Major Plugins/Packages:**
  - **Bootstrap:** For responsive design and layout.
  - **Helmet:** For managing the document head.
  - **Cloudinary:** To upload and manage images.
  - **Axios:** For making API requests.
  - **Animate.css:** For adding animations.

## Performance

### Page Load Time

The page load time of the application is **929 ms**. This was measured using the following JavaScript code snippet:

```javascript
const loadStartTime = window.performance.timing.navigationStart;
const loadEndTime = window.performance.timing.loadEventEnd;
const pageLoadTime = loadEndTime - loadStartTime;
```

### To enhance performance and decrease load times, the following optimizations were implemented:

Use of React Context API: By leveraging the Context API, data is loaded and managed efficiently across the application. This preemptive data loading significantly improves the user experience on the explore page by having data ready as soon as the user navigates to it, thereby reducing wait times.
