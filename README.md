## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

##  Challenges faced
1- Routing:
Initially, I faced some difficulty understanding how the routing system in Next.js works, especially with the new app directory structure. However, it didn’t take long to figure it out, and I was able to set up routes correctly.

2-Fetching Data by ID:
Implementing data fetching for individual recipes (by ID) required some troubleshooting to ensure the correct API routes were called and the data was properly displayed. This challenge was resolved after refining the logic and API handlers.

3-Authentication:

3.1-Sending API Requests: One of the challenges was understanding how to properly send requests to the API, especially when the api folder was used to define server-side functions. This required careful handling to ensure the API endpoints worked seamlessly with the frontend.

3.2-JWT Generation: Generating a JSON Web Token (JWT) for secure authentication proved to be a challenge. Initially, the implementation didn’t work as expected, so I decided to cancel this feature for now. However, I plan to revisit and fix it in the future.

4-Dark/Light Mode:
Implementing a theme toggle for dark and light mode didn’t work as intended. This feature is still incomplete, and I’m unsure about the best approach to make it functional. It's a task I plan to explore further.

5-Deployement:
Deploying the project required careful attention to ensure that APIs and routes worked in the production environment. While I managed to deploy successfully, it was a new learning experience for me.

## Deploy on Vercel

# This aspect has not been finalized yet.