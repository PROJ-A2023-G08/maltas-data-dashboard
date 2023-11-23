# Data Dashboard

## Specification
- Javascript
## Developer Documentation


- Clone this repository with this command ```
```sh 
git clone https://github.com/arielmalada/maltas-data-dashboard.git
```

- Create a branch with `your-name/#trello-ticket-number`, e.g: `messi/#1` 
*to see the trello ticket number, please install this extension* [https://chrome.google.com/webstore/detail/trello-card-numbers/ijnbgfbpkcnohomlcomegpocpkneblep]
- Create commit with meaningful message. e.g: `feat: allow provided config object to extend other configs` 
  reference: https://www.conventionalcommits.org/
- Test your code before create pull request!
- Write what changes from your branch in the description for your pull request with the template
- Each pull request should at least have 1 reviewer before merged, and all developers are responsible for reviewing each other pull request

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Frontend Development

First, run the development server:

```bash
npm run frontend:dev
```

## Install needed packages
You may need to run npm/yarn install in the root folder, packages/frontend and packages/backend to get all of the latest needed packages

## Run the tests
Ensure you have all of the needed packages, after this run npm test in the root folder. This will run all of the frontend and backend tests.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


### Testing

to run the test
```bash
npm run frontend test
```

Testing the component is required for each developed component, the minimum is making sure is rendering properly

```
// example

// component
const Dashboard = () => (<div>Dashboard</div>)

//test

describe("Dashboard", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<Dashboard  />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
```

It's also important to test each function/utils you create
```
// example

// function 
let count = 0
const increment = () => count + 1

// test
// the test
```

## Backend Development

First, run the development server:

```bash
npm run backend:dev
```

### Testing
to run the test
```bash
npm run backend test
```

Testing the component is required for each developed service

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
