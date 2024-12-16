# Restaurant Reserve Interface
This package is a basic demo system for reserving tables on a restaurant.

## Arechitecture
The system is a monolith with an Express server and a front based on Vite and React.

The front assets are static, generated during the build step.

Both back and front use TypeScript and Zod for type validation, and the same type schemas are imported by both from the `common` folder.

The UI utilizes TailwindCSS, components from Shadcn UI and other related tools.

The app is deployed on https://restaurant-reserve.onrender.com/  
In case the server isn't available (due to it being deployed in a free tier), try again a minute later.