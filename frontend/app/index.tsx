import { Redirect } from "expo-router";

const Page = () => {
  const isSignedIn = true;

  if (isSignedIn) return <Redirect href="/(authenticated)"/>

  return <Redirect href="/(not-authenticated)" />;
};

export default Page;
