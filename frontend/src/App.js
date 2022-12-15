import { Layout } from "antd"
import { AppHeader } from "./components/AppHeader";
import { Footer } from "./components/Footer";
export const App = () => {
  return (
    <>
      <AppHeader/>
      <main>
        <Layout>
          <h1>Hello</h1>
        </Layout>
      </main>
      <Footer/>
    </>
  );
}